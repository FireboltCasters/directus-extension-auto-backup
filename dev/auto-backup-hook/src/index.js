const CollectionsServiceCreator = require("./helper/CollectionsServiceCreator");
const BackupSettings = require("./BackupSettings");
const getSettingsSchema = require("./schema/schema.js");
const settingsSchemaYAML = getSettingsSchema();
const yaml = require('js-yaml');
const BackupController = require("./BackupController");
const settingsSchema = yaml.load(settingsSchemaYAML);

async function checkSettingsCollection(services, database, schema) {
    let collectionsServiceCreator = new CollectionsServiceCreator(services, database, schema);
    let collectionsService = await collectionsServiceCreator.getCollectionsService();
    try {
        let collections = await collectionsService.readByQuery(); //no query params possible !
        let collectionFound = false;
        for (let collection of collections) {
            if (collection.collection === BackupSettings.TABLENAME) {
                collectionFound = true;
                break;
            }
        }
        if (!collectionFound) {
            console.log("Collection "+BackupSettings.TABLENAME+" not found");
            let settingsSchemaCollection = settingsSchema.collections[0];
            let settingsSchemaFields = settingsSchema.fields;

            console.log("Creating "+BackupSettings.TABLENAME+" collection");
             await collectionsService.createOne({
                 ...settingsSchemaCollection,
                 fields: settingsSchemaFields
             });
            console.log("Created "+BackupSettings.TABLENAME+" collection");
        } else {
            //console.log("Settings collection found");
        }

    } catch (err) {
        console.log(err);
    }
}

module.exports = async function ({filter, action, init, schedule}, {
    services,
    exceptions,
    database,
    getSchema,
    logger
}) {
    try{
        console.log("Init auto backup")
        let schema = await getSchema();
        await checkSettingsCollection(services, database, schema)

        let backupController = new BackupController(services, database, schema);
        await backupController.init();

        action(
            BackupSettings.TABLENAME + ".items.update",
            async (meta, context) => {
                //TODO check if field "parse_meals" is active
                try {
                    await backupController.checkIfBackup();
                } catch (err) {
                    console.log(err);
                }
                //TODO set field "parse_meals" to false
            }
        );

        //let translatorSettings = new TranslatorSettings(services, database, schema);
        //await translatorSettings.init();
        //let translator = new Translator(translatorSettings, logger);
        //await translator.init();
        //registerAuthKeyReloader(filter, translator);

        //registerCollectionAutoTranslation(filter, getSchema, services, logger);
        //registerLanguagesFilter(filter, getSchema, services, logger); //TODO implement auto translate for new languages
    } catch (err) {
        let errMsg = err.toString();
        if(errMsg.includes("no such table: directus_collections")){
            console.log("++++++++++ Auto Backup +++++++++++");
            console.log("++++ Database not initialized yet +++++");
            console.log("++ Restart Server again after setup +++");
            console.log("+++++++++++++++++++++++++++++++++++++++");
        } else {
            console.log("Auto-Translation init error: ");
            console.log(err);
        }
    }
};
