using Umbraco.Cms.Core.Models;

using uSync.Migrations.Core;
using uSync.Migrations.Core.Composing;
using uSync.Migrations.Core.Configuration.Models;
using uSync.Migrations.Core.Extensions;
using uSync.Migrations.Migrators.Optional;

namespace MyMigrations;

/// <summary>
///  A Custom migration profile, to do things in special ways.
///  Uses our custom grid to BlockList migrator. 
///  Excludes "bandedContent" proprety (we will replace this manually with a blockList)
///  TODO:  Scaffold a blocklist editor for banded Content?
/// </summary>
public class QmuMigrationProfile : ISyncMigrationPlan
{
    private readonly SyncMigrationHandlerCollection _migrationHandlers;

    public QmuMigrationProfile(SyncMigrationHandlerCollection migrationHandlers)
    {
        _migrationHandlers = migrationHandlers;
    }

    public string Name => "QMU Migration Profile";

    public string Icon => "icon-cloud color-blue";

    public string Description => "A Custom Grid to BlockList migration with a couple of exclusions";

    public int Order => 10;

    public MigrationOptions Options => new()
    {
        SourceVersion = 8, // only run on v8 to v10+ migrations

        // write out to the same folder each time.
        Target = $"{uSyncMigrations.MigrationFolder}/QMU-Migration",

        // load all the handlers just enable the content ones.
        Handlers = _migrationHandlers
                        .Handlers
                        .Select(x => x.ToHandlerOption(true))
                        .ToList(),

        // for this migrator we want to use our custom grid to BlockList migrator.
        PreferredMigrators = new Dictionary<string, string>()
        {
            { Umbraco.Cms.Core.Constants.PropertyEditors.Aliases.Grid, nameof(GridToBlockListMigrator) },
            //{ Umbraco.Cms.Core.Constants.PropertyEditors.Aliases.NestedContent, nameof(NestedToBlockListMigrator) }
        },

        // add a list of properties we are ignoring on all content
        IgnoredProperties = new List<string>
        {
            "bandedContent"
        },
    };

}
