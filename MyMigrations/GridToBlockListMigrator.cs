using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.PropertyEditors;
using uSync.Migrations.Core.Context;
using uSync.Migrations.Core.Migrators;
using uSync.Migrations.Core.Migrators.Models;

namespace MyMigrations;

[SyncMigrator(Umbraco.Cms.Core.Constants.PropertyEditors.Aliases.Grid)]
[SyncMigratorVersion(8)]
// [HideFromTypeFinder] // hide from type if you don't want to automatically load this one (you have to replace in a composer)
// [SyncDefaultMigrator] // Set it to default and always want it to be the one for Grid. (can be overriden by preferred) (BF - We may not need a Custom plan if there's no other grids?)
internal class GridToBlockListMigrator : SyncPropertyMigratorBase
{
    private readonly ILogger<GridToBlockListMigrator> _logger;

    public GridToBlockListMigrator(ILogger<GridToBlockListMigrator> logger)
    {
        _logger = logger;
    }

    public override string GetEditorAlias(SyncMigrationDataTypeProperty propertyModel, SyncMigrationContext context)
        => Umbraco.Cms.Core.Constants.PropertyEditors.Aliases.BlockList;

    public override string GetDatabaseType(SyncMigrationDataTypeProperty dataTypeProperty, SyncMigrationContext context)
        => nameof(ValueStorageType.Ntext);

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

        var gridConfiguration = JsonConvert
            .DeserializeObject<GridConfiguration>(dataTypeProperty.ConfigAsString);

        // TODO: Make a blocklist config based on the grid datatype config (i.e. add the allowed blocks / settings etc

        return new BlockListConfiguration();
    }

    // TODO: Convert grid content to blocklist grid content
    public override string? GetContentValue(SyncMigrationContentProperty contentProperty, SyncMigrationContext context)
        => base.GetContentValue(contentProperty, context);
}
