const fs = require('fs')
const path = require('path')

export class BackupControllerSQLITE {

    constructor(backupController, backupSettings, services, database, schema, backupLogger) {
        this.database = database;
        this.backupController = backupController;
        this.backupSettings = backupSettings
        this.services = services;
        this.schema = schema;
        this.backupLogger = backupLogger;
    }

    async init(){

    }

    async getDirectusDatabasePath(){
        let rootPath = await this.backupController.getDirectusRootFolderPath();
        let databasepath = await this.backupSettings.getSQLITE3DBFilename();
        return path.join(rootPath, databasepath);
    }

    // apply snapshot https://github.com/directus/directus/blob/3761abf1f05941d88c5d284414227d353bfe7ebe/api/src/utils/apply-snapshot.ts

    async createBackup(tempFolderPath){
        // check if folder exists
        // create folder if not exists

        await this.backupLogger.log("Start backup");

        let databaseFilePath = await this.getDirectusDatabasePath();

        let tempBackupFilePath = path.join(tempFolderPath, "backup.db");
        await this.backupLogger.log("copy from: "+databaseFilePath);
        await this.backupLogger.log("copy to: "+tempBackupFilePath);
        try{
            fs.copyFileSync(databaseFilePath, tempBackupFilePath);
        } catch (error) {
            console.log(error)
            return null;
        }

        await this.backupLogger.log("Finished backup");

        return tempBackupFilePath;
    }

}
