using Lucene.Net.Util;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.PropertyEditors;
using Umbraco.Extensions;
using uSync.Migrations.Core.Context;
using uSync.Migrations.Core.Legacy.Grid;
using uSync.Migrations.Core.Migrators;
using uSync.Migrations.Core.Migrators.Models;
using uSync.Migrations.Core.Models;


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

    // TODO: Convert the grid config to block list grid. 
    public override object? GetConfigValues(SyncMigrationDataTypeProperty dataTypeProperty, SyncMigrationContext context)
    {
        _logger.LogDebug(">> {method}", nameof(GetConfigValues));

        if (dataTypeProperty.ConfigAsString == null)
        {
            _logger.LogDebug("Config is null, returning empty block grid config");
            return new BlockListConfiguration();
        }

        var excludedAliases = new List<string>() { "Test - Rich Text Block", "RC Test" };
        if (excludedAliases.Contains(dataTypeProperty.DataTypeAlias))
        {
            _logger.LogDebug($"{dataTypeProperty.DataTypeAlias} datatype is excluded from conversion as it is not utilised.  Returning empty block grid config");
            return new BlockListConfiguration();
        }

        var gridConfiguration = JsonConvert.DeserializeObject<GridConfiguration>(dataTypeProperty.ConfigAsString);

        // TODO: Make a blocklist config based on the grid datatype config (i.e. add the allowed blocks etc)

        var legacyGridEditorsConfig = GetGridConfig(context);

        // Default config
        var config = new BlockListConfiguration()
        {
            ValidationLimit = new BlockListConfiguration.NumberRange
            {
                Max = null,
                Min = null
            },
        };

        switch (dataTypeProperty.DataTypeAlias)
        {
            case "Right Column Layout - Grid":
                config.Blocks = AddSidebarBlocks(context);
                break;
            case "Banded Article":
                config.Blocks = AddArticleBlocks(context);
                break;
            default:
                throw new ArgumentOutOfRangeException($"Unknown Grid datatype encountered: {dataTypeProperty.DataTypeAlias}");
        }

        return config;
    }

    private BlockListConfiguration.BlockConfiguration[] AddSidebarBlocks(SyncMigrationContext context)
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

    private BlockListConfiguration.BlockConfiguration[] AddArticleBlocks(SyncMigrationContext context)
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

    // TODO: Convert grid content to blocklist grid content
    public override string? GetContentValue(SyncMigrationContentProperty contentProperty, SyncMigrationContext context)
        => base.GetContentValue(contentProperty, context);

    private ILegacyGridEditorsConfig GetGridConfig(SyncMigrationContext context)
    {
        return _gridConfig.EditorsByContext(context);
    }


}
