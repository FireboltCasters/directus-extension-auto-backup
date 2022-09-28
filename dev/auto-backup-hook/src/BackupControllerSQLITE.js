const BackupSettings = require("./BackupSettings");
const fs = require('fs')
const path = require('path')

const default_sqlite3_backup_file_format = "YYYY-MM-DD-HH-mm-ss-SSS";
const default_sqlite3_DB_FILENAME = "/directus/database/data.db";
const default_field_name_backup_folder_name = "backup_folder_name";
const default_field_name_backup_folder_value = "backups";

module.exports = class BackupControllerSQLITE {

    constructor(backupController, backupSettings, services, database, schema, logFunc) {
        this.database = database;
        this.backupController = backupController;
        this.backupSettings = backupSettings
        this.services = services;
        this.schema = schema;
        this.logFunc = logFunc;
    }

    async init(){

    }

    async getDirectusDatabasePath(){
        let rootPath = await this.backupController.getDirectusRootFolderPath();
        let databasepath = await this.backupSettings.getSQLITE3DBFilename();
        return path.join(rootPath, databasepath);
    }

    async log(oldlog, additionalLog){
        await this.logFunc(oldlog, additionalLog);
    }

    // apply snapshot https://github.com/directus/directus/blob/3761abf1f05941d88c5d284414227d353bfe7ebe/api/src/utils/apply-snapshot.ts

    async createBackup(tempFolderPath){
        // check if folder exists
        // create folder if not exists

        let log = "";
        log = await this.log(log, "Start backup");

        let databaseFilePath = await this.getDirectusDatabasePath();

        let tempBackupFilePath = path.join(tempFolderPath, "backup.db");
        log = await this.log(log, "copy from: "+databaseFilePath);
        log = await this.log(log, "copy to: "+tempBackupFilePath);
        try{
            fs.copyFileSync(databaseFilePath, tempBackupFilePath);
        } catch (error) {
            console.log(error)
            return null;
        }

        log = await this.log(log, "Finished backup");

        return tempBackupFilePath;
    }

}
