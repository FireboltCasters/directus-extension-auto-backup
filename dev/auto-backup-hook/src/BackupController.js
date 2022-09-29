const BackupSettings = require("./BackupSettings");
const BackupControllerSQLITE = require("./BackupControllerSQLITE");
const fs = require('fs')
const path = require('path')
const dateFormat = require('date-fns/format')
const BackupLogger = require("./BackupLogger");
const env = process.env;

module.exports = class BackupController {

    constructor(services, database, schema) {
        this.database = database;
        this.services = services;
        this.schema = schema;
        this.backupSettings = new BackupSettings(services, database, schema);
        this.finished = true;
        this.filesService = this.getFileService(schema, services);
        this.foldersService = this.getFolderService(schema, services);
        this.logger = new BackupLogger(this.backupSettings);
    }

    getFileService(schema, services){
        let fileService = new services.FilesService({ schema: schema, accountability: null });
        return fileService;
    }

    getFolderService(schema, services){
        let fileService = new services.FoldersService({ schema: schema, accountability: null });
        return fileService;
    }

    async init(){
        await this.backupSettings.init();
        //this.createBackup();
    }

    async getNewBackupFilenameWithoutExtension(dateBackupCreated){
        //TODO use default_sqlite3_backup_file_format
        let prefix = await this.backupSettings.getBackupFileFormatPrefix();
        let suffix = await this.backupSettings.getBackupFileFormatPostfix();
        let format = await this.backupSettings.getBackupFileFormat();

        let now = dateBackupCreated || new Date();
        let year = now.getFullYear();
        let month = now.getMonth()+1;
        let day = now.getDate();
        let hour = now.getHours();
        let minute = now.getMinutes();
        let second = now.getSeconds();
        let millisecond = now.getMilliseconds();
        let timestampFormated = year+"-"+month+"-"+day+"-"+hour+"-"+minute+"-"+second+"-"+millisecond;
        try{
            let formatedDate = dateFormat(now, format);
            timestampFormated = formatedDate;
        } catch(e){
            await this.logger.log("Error: Could not format date but using default: "+e);
        }

        return prefix+timestampFormated+suffix;
    }

    // apply snapshot https://github.com/directus/directus/blob/3761abf1f05941d88c5d284414227d353bfe7ebe/api/src/utils/apply-snapshot.ts

    async getDirectusRootFolderPath(){
        let relaticePath = path.join(__dirname, "./../../../../");
        let absolutePath = path.resolve(relaticePath);
        return absolutePath;
    }

    async createFolderIfNotExists(folderpath){
        if (!fs.existsSync(folderpath)){
            fs.mkdirSync(folderpath, { recursive: true });
        }
    }

    async getTempFolderPath(){
        let rootFolderPath = await this.getDirectusRootFolderPath();
        //
        let tempFolderPath = path.join(rootFolderPath, "directus", "database", "temp"); // get path to temp folder
        return tempFolderPath;
    }

    async deleteTempFolder(){
        let tempFolderPath = await this.getTempFolderPath()
        await this.logger.log("Delete temp folder: "+tempFolderPath);
        if (fs.existsSync(tempFolderPath)){
            fs.rmSync(tempFolderPath, { recursive: true });
        }
        await this.logger.log("Temp folder deleted");
    }

    getFileExtension(filePath){
        let fileExtension = path.extname(filePath);
        return fileExtension;
    }

    async createOrGetFileLibraryFolder(folderName, folderId){
        if(!folderId){
            await this.logger.log("Backup location folder id not set");
            const createdFolder = await this.foldersService.createOne({
                name: folderName,
            }); //create one
            await this.logger.log("Backup location folder created: "+createdFolder);
            folderId = createdFolder;
            if(!folderId){
                console.log("Error: Could not create folder");
                await this.logger.log("Error: Could not create folder");
                return null;
            } else {
                await this.logger.log("Backup location folder id set: "+folderId);
                await this.backupSettings.setBackupLocationFileLibraryFolderID(folderId);
                return folderId;
            }
        } else {
            await this.logger.log("Folder id set: "+folderId+" - check if folder exists");
            const folder_instance = await this.foldersService.readOne(folderId);
            if(!folder_instance){
                await this.logger.log("Folder instance not found: "+folderId+" - create folder");
                return await this.createOrGetFileLibraryFolder(folderName, null);
            } else {
                // update folder name
                await this.logger.log("Folder instance found: "+folderId+" - update folder name");
                await this.backupSettings.setBackupLocationFileLibraryFolderName(folder_instance.name);
                return folderId;
            }
        }
    }

    getFileLibraryStorageLocation(){
        let storageLocationsString = env.STORAGE_LOCATIONS || "";
        let storageLocations = storageLocationsString.split(",");
        return storageLocations[0];
    }

    async moveBackupFileToFilelibrary(tempBackupFilePath, backupFilenameWithExtension){
        await this.logger.log("Move backup file to file library");
        let folderNameFromSettings = await this.backupSettings.getBackupLocationFileLibraryFolderName();
        let folderIdFromSettings = await this.backupSettings.getBackupLocationFileLibraryFolderID();

        let folderId = await this.createOrGetFileLibraryFolder(folderNameFromSettings, folderIdFromSettings);
        if(!folderId){
            await this.logger.log("Error: Could not create or get file library folder");
            return null;
        } else {
            let body = {
                title : backupFilenameWithExtension,
                tags: ["backup"],
                filename_download: backupFilenameWithExtension,
                filesize: fs.statSync(tempBackupFilePath).size,
                folder: folderId,
                storage: this.getFileLibraryStorageLocation()
            };

            let readStream = fs.createReadStream(tempBackupFilePath);

            await this.logger.log("Upload backup file to file library");
            const importedBackup = await this.filesService.uploadOne(readStream, body);
            await this.logger.log("Backup file moved to file library");
        }
    }

    async moveBackupFileToCustomPath(tempBackupFilePath, backupFilenameWithExtension){
        await this.logger.log("Move backup file to custom path");
        let backup_location_custom_path = await this.backupSettings.getBackupLocationCustomPath();

        await this.logger.log("Create if not exists: "+backup_location_custom_path);
        await this.createFolderIfNotExists(backup_location_custom_path); // create folder if not exists

        let rootFolderPath = await this.getDirectusRootFolderPath();
        let newBackupFilePath = path.join(rootFolderPath, backup_location_custom_path, backupFilenameWithExtension);

        try{
            await this.logger.log("Move backup file to custom path: "+newBackupFilePath);
            fs.copyFileSync(tempBackupFilePath, newBackupFilePath);
            await this.deleteTempFolder();
            return true;
        } catch (error) {
            console.log(error)
            await this.logger.log(error.toString());
            await this.deleteTempFolder();
            return false;
        }
    }

    async moveBackupFileToFinalBackupFolder(tempBackupFilePath, dateBackupCreated){
        await this.logger.log("Move backup file to backup folder");

        let fileExtension = this.getFileExtension(tempBackupFilePath);
        let backupFilenameWithoutExtension = await this.getNewBackupFilenameWithoutExtension(dateBackupCreated);
        let backupFilenameWithExtension = backupFilenameWithoutExtension+fileExtension;


        console.log("Backup filename: "+backupFilenameWithExtension);
        await this.logger.log("Backup filename: "+backupFilenameWithExtension);

        let backupLocationType = await this.backupSettings.getBackupLocationType();
        console.log("Backup location type: "+backupLocationType);
        await this.logger.log("Backup location type: "+backupLocationType);

        if(this.backupSettings.isBackupLocationTypeFileLibrary(backupLocationType)){
            await this.moveBackupFileToFilelibrary(tempBackupFilePath, backupFilenameWithExtension);
        } else if(this.backupSettings.isBackupLocationTypeCustomPath(backupLocationType)){
            await this.moveBackupFileToCustomPath(tempBackupFilePath, backupFilenameWithExtension);
        }

    }

    async createBackup(){
        // check if folder exists
        // create folder if not exists

        await this.logger.resetLog();
        await this.logger.log("Init start backup");

        let tempFolderPath = await this.getTempFolderPath();
        await this.createFolderIfNotExists(tempFolderPath); // create temp folder if not exists

        let specificController = null;
        let dbClient = await this.backupSettings.getDBClient();
        if(this.backupSettings.isSQLITE3DBClient(dbClient)){
            await this.logger.log("SQLITE3 DB Client selected");
            specificController = new BackupControllerSQLITE(this, this.backupSettings, this.services, this.database, this.schema, await this.logger);
            await specificController.init();
        }

        if(!!specificController){
            let dateBackupCreated = new Date();
            let tempBackupFilePath = await specificController.createBackup(tempFolderPath); // create backup file
            if(tempBackupFilePath){ // if backup file was created
                await this.logger.log("Backup created and temporarily stored at: "+tempBackupFilePath);
                // move backup file to backup folder
                await this.moveBackupFileToFinalBackupFolder(tempBackupFilePath, dateBackupCreated);

                console.log("Moved backup file to backup folder finished");
                await this.logger.log("Moved backup file to backup folder finished");
            } else { // if backup file was not created
                console.log("Backup failed, since no backup file was created");
                await this.logger.log("Backup failed, since no backup file was created");
            }
        } else {
            console.log("No specific controller found for db client: "+dbClient);
            await this.logger.log("No specific controller found for db client: "+dbClient);
        }
    }

    async checkIfBackup(){
        let active = await this.backupSettings.getActiveStatus();
        if(active){
            let state = await this.backupSettings.getState();

            let statusCreate = "create";
            let statusFinished = "finished";
            let statusRunning = "running";
            let statusFailed = "failed";
            if(state===statusCreate && this.finished){
                this.finished = false;
                await this.backupSettings.setCurrentState(statusRunning);
                try{
                    await this.createBackup();
                    this.finished = true;
                    await this.backupSettings.setCurrentState(statusFinished);
                } catch (err) {
                    await this.backupSettings.setLatestLog(err.toString());
                    this.finished = true;
                    await this.backupSettings.setCurrentState(statusFailed);
                }
            } else if(state !== statusRunning && !this.finished){
                await this.backupSettings.setCurrentState(statusRunning);
            } else {
//                console.log("Auto backup already running");
            }
        } else {
//            console.log("Auto backup not active");
        }
    }

}
