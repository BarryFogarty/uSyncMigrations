using Lucene.Net.Util;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Models.Blocks;
using Umbraco.Cms.Core.PropertyEditors;
using Umbraco.Extensions;

using uSync.Migrations.Core.Context;
using uSync.Migrations.Core.Legacy.Grid;
using uSync.Migrations.Core.Migrators;
using uSync.Migrations.Core.Migrators.Models;
using uSync.Migrations.Core.Models;
using static Umbraco.Cms.Core.Constants;
using static Umbraco.Cms.Core.Constants.HttpContext;

namespace MyMigrations;

[SyncMigrator(Umbraco.Cms.Core.Constants.PropertyEditors.Aliases.Grid)]
[SyncMigratorVersion(8)]
// [HideFromTypeFinder] // hide from type if you don't want to automatically load this one (you have to replace in a composer)
// [SyncDefaultMigrator] // Set it to default and always want it to be the one for Grid. (can be overriden by preferred) (BF - We may not need a Custom plan if there's no other grids?)
internal class GridToBlockListMigrator : SyncPropertyMigratorBase
{
    private readonly ILogger<GridToBlockListMigrator> _logger;
    private readonly ILegacyGridConfig _gridConfig;
    private readonly ILoggerFactory _loggerFactory;

    public GridToBlockListMigrator(
        ILegacyGridConfig gridConfig,
        ILoggerFactory loggerFactory,
        ILogger<GridToBlockListMigrator> logger)
    {
        _gridConfig = gridConfig;
        _loggerFactory = loggerFactory;
        _logger = logger;
    }

    public override string GetEditorAlias(SyncMigrationDataTypeProperty propertyModel, SyncMigrationContext context)
        => Umbraco.Cms.Core.Constants.PropertyEditors.Aliases.BlockList;

    // Convert the legacy grid config to block list grid. 
    /// <summary>
    /// 
    /// </summary>
    /// <param name="dataTypeProperty"></param>
    /// <param name="context"></param>
    /// <returns></returns>
    /// <exception cref="ArgumentOutOfRangeException"></exception>
    public override object? GetConfigValues(SyncMigrationDataTypeProperty dataTypeProperty, SyncMigrationContext context)
    {
        _logger.LogDebug(">> {method}", nameof(GetConfigValues));

        if (dataTypeProperty.ConfigAsString == null)
        {
            _logger.LogDebug("Config is null, returning empty block grid config");
            return new BlockListConfiguration();
        }

        var excludedAliases = new List<string>() { "Test - Rich Text Block", "RC Test" }; // These datatypes are not utilised, exclude them
        if (excludedAliases.Contains(dataTypeProperty.DataTypeAlias))
        {
            string message = $"{dataTypeProperty.DataTypeAlias} datatype is excluded from conversion as it is not utilised.  Returning empty block grid config";
            _logger.LogDebug(message);
            return new BlockListConfiguration();
        }

        // Default config
        var config = new BlockListConfiguration()
        {
            ValidationLimit = new BlockListConfiguration.NumberRange
            {
                Max = null,
                Min = null
            },
        };

        // Implement specific config based on datatype alias
        config.Blocks = dataTypeProperty.DataTypeAlias switch
        {
            "Right Column Layout - Grid" => SidebarBlockListConfig(context),
            "Banded Article" => ArticleBlockListConfig(context),
            _ => throw new ArgumentOutOfRangeException($"Unknown Grid datatype encountered: {dataTypeProperty.DataTypeAlias}"),
        };

        return config;
    }

    #region Datatype config
    private static BlockListConfiguration.BlockConfiguration[] SidebarBlockListConfig(SyncMigrationContext context)
    {
        // Would be best to get this from config, but for now let's just gen a hardcoded list of blocks
        // TODO:  Detect / warn for any _Content_ blocks that do not have a matching config item
        var blocks = new List<BlockListConfiguration.BlockConfiguration>
        {
            new() {
                Label = "Links",
                Thumbnail = "icon-link",
                ContentElementTypeKey = context.ContentTypes.GetKeyByAlias("links")
            },
            new() {
                Label = "Useful Links",
                Thumbnail = "icon-link",
                ContentElementTypeKey = context.ContentTypes.GetKeyByAlias("usefulLinks")
            },
            new() {
                Label = "Useful Links (from Library)",
                Thumbnail = "icon-link",
                ContentElementTypeKey = context.ContentTypes.GetKeyByAlias("usefulLinksFromLibrary")
            },
            new() {
                Label = "Social Media",
                Thumbnail = "icon-share",
                ContentElementTypeKey = context.ContentTypes.GetKeyByAlias("socialMedia")
            },
            new() {
                Label = "Custom Social Media",
                Thumbnail = "icon-share",
                ContentElementTypeKey = context.ContentTypes.GetKeyByAlias("customSocialMedia")
            },
            new() {
                Label = "RC Event",
                Thumbnail = "icon-calendar",
                ContentElementTypeKey = context.ContentTypes.GetKeyByAlias("rCEvent")
            },
            new() {
                Label = "Event (from library)",
                Thumbnail = "icon-calendar",
                ContentElementTypeKey = context.ContentTypes.GetKeyByAlias("eventFromLibrary")
            },
            new() {
                Label = "News Events Blogs",
                Thumbnail = "icon-newspaper",
                ContentElementTypeKey = context.ContentTypes.GetKeyByAlias("newsEventsBlogs")
            },
            new() {
                Label = "Quotes",
                Thumbnail = "icon-quote",
                ContentElementTypeKey = context.ContentTypes.GetKeyByAlias("quotes")
            }
        };

        return blocks.ToArray();
    }

    private static BlockListConfiguration.BlockConfiguration[] ArticleBlockListConfig(SyncMigrationContext context)
    {
        var bandedImageBlockAlias = "bandedImageBlock";
        var contentElementTypeKey = context.ContentTypes.GetKeyByAlias(bandedImageBlockAlias);

        if (contentElementTypeKey.Equals(Guid.Empty)) 
        {
            var newContentElement = CreateBandedImageBlock(bandedImageBlockAlias, context);
            contentElementTypeKey = newContentElement.Key;
        }

        var blocks = new List<BlockListConfiguration.BlockConfiguration>
        {
            new() {
                Label = "Banded Image Block",
                Thumbnail = "icon-picture",
                ContentElementTypeKey = contentElementTypeKey
            }
        };

        return blocks.ToArray();
    }

    private static NewContentTypeInfo CreateBandedImageBlock(string bandedImageBlockAlias, SyncMigrationContext context)
    {
        var newContentType = new NewContentTypeInfo(
            key: bandedImageBlockAlias.ToGuid(),
            alias: bandedImageBlockAlias,
            name: "Banded Image Block",
            icon: "icon-picture", // TODO with text?
            folder: "BlockList")
        {
            IsElement = true
        };

        // Boilerplate: Add properties to element (Image, Title, Text, Img Position)
        newContentType.Tabs = new List<NewContentTypeTab>() {
            new() { Alias = "content", Name = "Content" }
        };

        newContentType.Properties.AddRange(
            new List<NewContentTypeProperty>()
            {
                new(alias: "image", name: "Image", dataTypeAlias: "Media Picker") { TabAlias = "content" },
                new(alias: "Title",name: "title", dataTypeAlias: "Textstring") { TabAlias = "content" },
                new(alias: "Text", name: "text", dataTypeAlias: "Textarea") { TabAlias = "content" },
                new(alias: "imageLeft", name: "Image Left?", dataTypeAlias: "truefalse") { TabAlias = "content" },
            }
        );

        context.ContentTypes.AddNewContentType(newContentType);
        context.ContentTypes.AddAliasAndKey(newContentType.Alias, newContentType.Key);
        context.ContentTypes.AddElementType(newContentType.Key);

        return newContentType;
    }
    #endregion

    /// <summary>
    ///  Convert legacy grid content to blocklist grid content
    /// </summary>
    public override string? GetContentValue(SyncMigrationContentProperty contentProperty, SyncMigrationContext context)
    {
        _logger.LogDebug(">> {method}", nameof(GetContentValue));

        if (string.IsNullOrWhiteSpace(contentProperty.Value))
        {
            _logger.LogDebug("  Content property [{name}] is blank, nothing to migrate", contentProperty.EditorAlias);
            return string.Empty;
        }

        if (contentProperty.Value.Contains("\"Umbraco.BlockGrid\""))
        {
            _logger.LogDebug("Property [{name}] is already BlockList", contentProperty.EditorAlias);
            return contentProperty.Value;
        }

        var grid = GetGridValueFromString(contentProperty.EditorAlias, contentProperty.Value);
        if (grid == null)
        {
            _logger.LogDebug("  Property {alias} is empty", contentProperty.EditorAlias);
            return string.Empty;
        }

        // Parse the source data, for now lets do it like NC (sidebar)
        var blockValue = new BlockValue();
        var contentData = new List<BlockItemData>();
        var blockListLayout = new List<BlockListLayoutItem>();

        // Go through the source JSON, and extract the content blocks
        foreach (var section in grid.Sections)
        {
            foreach (var row in section.Rows)
            {
                if (row.Name == "Image Left" || row.Name == "Image Right")
                {
                    // Create ONE bandedImageBlock per Image row (TODO: ideally with the image and the imgLeft flag set)
                    var bandedImageBlock = BandedImageBlock(row, context);

                    blockListLayout.Add(new BlockListLayoutItem { ContentUdi = bandedImageBlock.Udi });
                    contentData.Add(bandedImageBlock);

                    continue;
                }

                foreach (var area in row.Areas)
                {
                    foreach (var control in area.Controls)
                    {
                        if (!control.Value?.HasValues == true) continue;

                        var isDTGEvalue = !String.IsNullOrEmpty(control.Value?.Value<string>("dtgeContentTypeAlias"));
                        if (!isDTGEvalue)
                        {
                            // TODO:  Log something for tracking and continue
                            throw new Exception($"Grid control is not DTGE:   {control.Value}"); // TODO:  Include current content info                    
                            //_logger.LogError("This is not DTGE: [{controlValue}]", control.Value);
                        }

                        var contentTypeAlias = GetContentTypeAlias(control);
                        var contentTypeKey = context.ContentTypes.GetKeyByAlias(contentTypeAlias);
                        var blockId = GetGridElementId(control).ToGuid();

                        var block = new BlockItemData
                        {
                            ContentTypeKey = contentTypeKey,
                            Udi = Udi.Create(UdiEntityType.Element, blockId),
                            RawPropertyValues = GetPropertyValues(control, context)
                        };

                        blockListLayout.Add(new BlockListLayoutItem { ContentUdi = block.Udi });
                        contentData.Add(block);
                    }
                }
            }
        }

        blockValue.ContentData = contentData;
        blockValue.Layout = new Dictionary<string, JToken>()
        {
            { "Umbraco.BlockList", JToken.FromObject(blockListLayout) }
        };

        return JsonConvert.SerializeObject(blockValue, Formatting.Indented);
    }

    private BlockItemData BandedImageBlock(GridValue.GridRow row, SyncMigrationContext context)
    {
        var contentTypeAlias = "bandedImageBlock";
        var contentTypeKey = context.ContentTypes.GetKeyByAlias(contentTypeAlias);

        return new BlockItemData
        {
            ContentTypeKey = contentTypeKey,
            Udi = Udi.Create(UdiEntityType.Element, row.Id),
            RawPropertyValues = new Dictionary<string, object?>() // If there's time we could look at getting the media item here, but for now the plan is to content-pop manually
        };
    }

    #region Grid content helper methods
    private GridValue? GetGridValueFromString(string editorAlias, string value)
    {
        try
        {
            return JsonConvert.DeserializeObject<GridValue>(value);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting grid {alias}", editorAlias);
            throw;
        }
    }

    private string GetContentTypeAlias(GridValue.GridControl control)
        => control.Value?.Value<string>("dtgeContentTypeAlias") ?? string.Empty;

    private string GetGridElementId(GridValue.GridControl control)
        => control.Value?.Value<string>("id") ?? string.Empty;

    private Dictionary<string, object?> GetPropertyValues(GridValue.GridControl control, SyncMigrationContext context)
    {
        var propertyValues = new Dictionary<string, object>();

        var contentTypeAlias = GetContentTypeAlias(control);
        if (string.IsNullOrWhiteSpace(contentTypeAlias)) return propertyValues;

        var elementValue = control.Value?.Value<JObject>("value")?
            .ToObject<IDictionary<string, object>>();

        if (elementValue == null) return propertyValues;

        foreach (var (propertyAlias, value) in elementValue)
        {
            var editorAlias = context.ContentTypes.GetEditorAliasByTypeAndProperty(contentTypeAlias, propertyAlias);

            if (editorAlias == null) continue;

            // TODO:  Check if I can consolidate this (i.e. should it always use one or the other?)
            var migrator = context.Migrators.TryGetMigrator("DTGE." + editorAlias.OriginalEditorAlias);
            if (migrator == null)
                migrator = context.Migrators.TryGetMigrator(editorAlias.OriginalEditorAlias);

            var propertyValue = value;

            if (migrator != null)
            {
                var valueToConvert = (value?.ToString() ?? "").Trim();

                var property = new SyncMigrationContentProperty(
                    $"DTGE.{editorAlias.OriginalEditorAlias}",
                    propertyAlias,
                    editorAlias.OriginalEditorAlias,
                    valueToConvert);

                var convertedValue = migrator.GetContentValue(property, context);
                if (convertedValue?.Trim().DetectIsJson() == true)
                    propertyValue = JsonConvert.DeserializeObject(convertedValue ?? "");
                else
                    propertyValue = convertedValue;

            }

            if (propertyValue != null)
                propertyValues[propertyAlias] = propertyValue;
        }

        return propertyValues;
    }

    #endregion

}
