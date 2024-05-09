using uSync.Migrations.Core;
using uSync.Migrations.Core.Composing;
using uSync.Migrations.Core.Configuration.Models;
using uSync.Migrations.Migrators.Optional;

namespace MyMigrations;

/// <summary>
///  A Custom QMU-specific migration plan
///  Uses our custom grid to BlockList migrator to migarte the 2 'active' legacy grids 
///  Also scaffolds a blocklist editor for 'bandedContent' that replaces each 'Image Left/Right' grid row with an empty 'Banded Image Block' element, for later content pop 
/// </summary>
public class QmuMigrationPlan : ISyncMigrationPlan
{
    private readonly SyncMigrationHandlerCollection _migrationHandlers;

    public QmuMigrationPlan(SyncMigrationHandlerCollection migrationHandlers)
    {
        _migrationHandlers = migrationHandlers;
    }

    public string Name => "QMU Migration Plan";

    public string Icon => "icon-cloud color-blue";

    public string Description => "A Custom Grid to BlockList migration with a couple of exclusions";

    public int Order => 10;

    public MigrationOptions Options => new()
    {
        // TODO:  Enable as an in-place convert (?)
        //Group = "Convert",
        //Source = "uSync/v9",

        SourceVersion = 8, // only run on v8 to v10+ migrations

        // write out to the same folder each time.
        Target = $"{uSyncMigrations.MigrationFolder}/QMU-Migration",

        Handlers = _migrationHandlers.SelectGroup(8, string.Empty),

        // for this migrator we want to use our custom grid to BlockList migrator.
        // We also want to include NC to BlockList
        PreferredMigrators = new Dictionary<string, string>()
        {
            { Umbraco.Cms.Core.Constants.PropertyEditors.Aliases.Grid, nameof(GridToBlockListMigrator) },
            { Umbraco.Cms.Core.Constants.PropertyEditors.Aliases.NestedContent, nameof(NestedToBlockListMigrator) }
        },

        // add a list of properties we are ignoring on all content
        //IgnoredProperties = new List<string>
        //{
        //    "bandedContent"
        //},
    };

}
