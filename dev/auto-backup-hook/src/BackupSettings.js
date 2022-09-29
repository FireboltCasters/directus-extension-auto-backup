const ItemsServiceCreator = require("./helper/ItemsServiceCreator");

const default_sqlite3_DB_FILENAME = "/directus/database/data.db";
const default_field_name_backup_folder_value = "/directus/database/backups";
const default_sqlite3_backup_file_format = "YYYY-MM-DD-HH-mm-ss-SSS";


module.exports = class BackupSettings {

    static TABLENAME = "auto_backup_settings";

    constructor(services, database, schema) {
        this.database = database;
        this.itemsServiceCreator = new ItemsServiceCreator(services, database, schema);
    }

    async init(){
        this.translationSettingsService = await this.itemsServiceCreator.getItemsService(BackupSettings.TABLENAME);
    }

    async setSettings(newSettings) {
        let settings = await this.getSettings();
        if(!!settings && settings?.id){
            await this.translationSettingsService.updateOne(settings?.id, newSettings);
        }
    }

    async getActiveStatus() {
        let settings = await this.getSettings();
        return settings?.active;
    }

    async getState() {
        let settings = await this.getSettings();
        return settings?.state;
    }

    async getDBClient(){
        let settings = await this.getSettings();
        return settings?.DB_CLIENT || "sqlite3";
    }

    isSQLITE3DBClient(client){
        return client === "sqlite3";
    }

    async getBackupLocationType() {
        let settings = await this.getSettings();
        return settings?.backup_location_type || "file_library"; // other option: "custom_path"
    }

    isBackupLocationTypeFileLibrary(type){
        return type === "file_library";
    }

    async getBackupLocationFileLibraryFolderName() {
        let settings = await this.getSettings();
        return settings?.backup_location_folder_name || "backups";
    }

    async setBackupLocationFileLibraryFolderName(folderName){
        await this.setSettings({backup_location_folder_name: folderName});
    }

    async getBackupLocationFileLibraryFolderID(){
        let settings = await this.getSettings();
        return settings?.backup_location_folder_id;
    }

    async getBackupFileFormatPrefix(){
        let settings = await this.getSettings();
        let format = settings?.backup_file_format_prefix;
        if(format === null || format === undefined){
            return "backup-";
        }
        return format || "";
    }

    async getBackupFileFormatPostfix(){
        let settings = await this.getSettings();
        return settings?.backup_file_format_postfix || "";
    }

    async getBackupFileFormat() {
        let settings = await this.getSettings();
        let format = settings?.backup_file_format;
        if(format === null || format === undefined){
            return default_sqlite3_backup_file_format;
        }
        return format || "";
    }


    async setBackupLocationFileLibraryFolderID(folderID){
        await this.setSettings({backup_location_folder_id: folderID});
    }

    isBackupLocationTypeCustomPath(type){
        return type === "custom_path";
    }

    async getBackupLocationCustomPath() {
        let settings = await this.getSettings();
        return settings?.backup_location_custom_path;
    }

    async getSQLITE3DBFilename() {
        let settings = await this.getSettings();
        let value = settings?.sqlite3_db_filename;
        return value || default_sqlite3_DB_FILENAME;
    }

    async setCurrentState(state) {
        await this.setSettings({state: state});
    }

    async setLatestLog(log) {
        await this.setSettings({latest_log: log});
    }

    async getSettings() {
        // on creating an item, we cant use knex?
        // KnexTimeoutError: Knex: Timeout acquiring a connection. The pool is probably full.
        let settings = await this.translationSettingsService.readByQuery({});
        if(!!settings && settings.length > 0){
            return settings[0];
        }
        return null;
    }

    async isAutoBackupEnabled() {
        let settings = await this.getSettings();
        return settings?.active;
    }

}
