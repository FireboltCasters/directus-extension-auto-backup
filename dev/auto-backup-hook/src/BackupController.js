const BackupSettings = require("./BackupSettings");
const BackupControllerSQLITE = require("./BackupControllerSQLITE");
const fs = require('fs')
const path = require('path')
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
        this.createBackup();
    }

    async log(oldlog, additionalLog){
        oldlog+=new Date().toISOString()+": "+additionalLog+"\n\n";
        //await this.backupSettings.setLatestLog(oldlog);
        return oldlog;
    }

    async getNewBackupFilenameWithoutExtension(){
        //TODO use default_sqlite3_backup_file_format

        let now = new Date();
        let year = now.getFullYear();
        let month = now.getMonth()+1;
        let day = now.getDate();
        let hour = now.getHours();
        let minute = now.getMinutes();
        let second = now.getSeconds();
        let millisecond = now.getMilliseconds();
        let newBackupFilename = "backup-"+year+"-"+month+"-"+day+"-"+hour+"-"+minute+"-"+second+"-"+millisecond;
        return newBackupFilename;
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
        let tempFolderPath = path.join(rootFolderPath, "directus", "database", "temp"); // get path to temp folder
        return tempFolderPath;
    }

    async deleteTempFolder(log){
        let tempFolderPath = await this.getTempFolderPath()
        console.log("Delete temp folder: "+tempFolderPath);
        log = await this.log(log, "Delete temp folder: "+tempFolderPath);
        if (fs.existsSync(tempFolderPath)){
            fs.rmSync(tempFolderPath, { recursive: true });
        }
        console.log("Temp folder deleted");
        log = await this.log(log, "Temp folder deleted");
    }

    getFileExtension(filePath){
        let fileExtension = path.extname(filePath);
        return fileExtension;
    }

    async moveBackupFileToBackupFolder(tempBackupFilePath, now, log){
        console.log("Move backup file to backup folder");
        log = await this.log(log, "Move backup file to backup folder");

        let fileExtension = this.getFileExtension(tempBackupFilePath);
        let backupName = await this.getNewBackupFilenameWithoutExtension(now);
        let backupFilename = backupName+fileExtension;


        console.log("Backup filename: "+backupFilename);
        log = await this.log(log, "Backup filename: "+backupFilename);

        let backupLocationType = await this.backupSettings.getBackupLocationType();
        console.log("Backup location type: "+backupLocationType);
        log = await this.log(log, "Backup location type: "+backupLocationType);

        if(this.backupSettings.isBackupLocationTypeFileLibrary(backupLocationType)){
            let folderName = await this.backupSettings.getBackupLocationFileLibraryFolderName();
            let folderId = await this.backupSettings.getBackupLocationFileLibraryFolderID();
            console.log("Backup location folder name: "+folderName);
            log = await this.log(log, "Backup location folder name: "+folderName);
            console.log("Backup location folder id: "+folderId);
            log = await this.log(log, "Backup location folder id: "+folderId);

            if(!folderId){
                console.log("Backup location folder id not set");
                log = await this.log(log, "Backup location folder id not set");
                const createdFolder = await this.foldersService.createOne({
                    name: folderName,
                }); //create one
                console.log("Backup location folder created: "+createdFolder);
                log = await this.log(log, "Backup location folder created: "+createdFolder);
                folderId = createdFolder;
                if(!folderId){
                    console.log("Error: Could not create folder");
                    log = await this.log(log, "Error: Could not create folder");
                    return;
                } else {
                    console.log("Backup location folder id set: "+folderId);
                    log = await this.log(log, "Backup location folder id set: "+folderId);
                    await this.backupSettings.setBackupLocationFileLibraryFolderID(folderId);
                }
            } else {
                console.log("Change folder name");
                log = await this.log(log, "Change folder name");
                await this.backupSettings.setBackupLocationFileLibraryFolderName("okay");


                // https://github.com/directus/directus/blob/main/api/src/services/files.ts

                // let primaryKey = await this.createOne(payload, { emitEvents: false });
                // payload.filename_disk = primaryKey + (fileExtension || '');
                // payload.type = 'application/octet-stream';
                // payload.folder = settings.storage_default_folder;
                // move file to folder
                // const { size } = await storage.disk(data.storage).getStat(payload.filename_disk);
                // payload.filesize = size;

                // 		// We do this in a service without accountability. Even if you don't have update permissions to the file,
                // 		// we still want to be able to set the extracted values from the file on create
                // 		const sudoService = new ItemsService('directus_files', {
                // 			knex: this.knex,
                // 			schema: this.schema,
                // 		});
                //
                // 		await sudoService.updateOne(primaryKey, payload, { emitEvents: false });

                let storageLocationsString = env.STORAGE_LOCATIONS || "";
                console.log("storageLocationsString: "+storageLocationsString);
                log = await this.log(log, "storageLocationsString: "+storageLocationsString);
                let storageLocations = storageLocationsString.split(",");
                console.log("storageLocations: "+storageLocations);
                log = await this.log(log, "storageLocations: "+storageLocations);

                let body = {
                    filename_download: backupFilename,
                    folder: folderId,
                    storage: storageLocations[0]
                };

                console.log("tempBackupFilePath url: "+tempBackupFilePath);
                let readStream = fs.createReadStream(tempBackupFilePath);

                const importedBackup = await this.filesService.uploadOne(readStream, body);
                console.log("Backup file moved to file library");
                log = await this.log(log, "Backup file moved to file library");
            }

            //this.filesService
        } else if(this.backupSettings.isBackupLocationTypeCustomPath(backupLocationType)){
            let backup_location_custom_path = await this.backupSettings.getBackupLocationCustomPath();

            console.log("Create if not exists: "+backup_location_custom_path);
            log = await this.log(log, "Create if not exists: "+backup_location_custom_path);
            await this.createFolderIfNotExists(backup_location_custom_path); // create folder if not exists

            let rootFolderPath = await this.getDirectusRootFolderPath();
            let newBackupFilePath = path.join(rootFolderPath, backup_location_custom_path, backupFilename);

            try{
                console.log("Move backup file to custom path: "+newBackupFilePath);
                log = await this.log(log, "Move backup file to custom path: "+newBackupFilePath);
                fs.copyFileSync(tempBackupFilePath, newBackupFilePath);
                log = await this.deleteTempFolder(log);
                return log;
            } catch (error) {
                console.log(error)
                log = await this.log(log, error.toString());
                log = await this.deleteTempFolder(log);
                return log;
            }
        }

    }

    async createBackup(){
        // check if folder exists
        // create folder if not exists

        let log = "";
        log = await this.log(log, "Init start backup");
        let now = new Date();

        let tempFolderPath = await this.getTempFolderPath();
        await this.createFolderIfNotExists(tempFolderPath); // create temp folder if not exists

        let specificController = null;
        let dbClient = await this.backupSettings.getDBClient();
        if(this.backupSettings.isSQLITE3DBClient(dbClient)){
            log = await this.log(log, "SQLITE3 DB Client selected");
            specificController = new BackupControllerSQLITE(this, this.backupSettings, this.services, this.database, this.schema, this.log);
            await specificController.init();
        }

        if(!!specificController){
            let tempBackupFilePath = await specificController.createBackup(tempFolderPath); // create backup file
            if(tempBackupFilePath){ // if backup file was created
                console.log("Backup created and temporarily stored at: "+tempBackupFilePath);
                log = await this.log(log, "Backup created and temporarily stored at: "+tempBackupFilePath);
                // move backup file to backup folder
                log = await this.moveBackupFileToBackupFolder(tempBackupFilePath, now, log);

                console.log("Moved backup file to backup folder finished");
                log = await this.log(log, "Moved backup file to backup folder finished");
            } else { // if backup file was not created
                console.log("Backup failed, since no backup file was created");
                log = await this.log(log, "Backup failed, since no backup file was created");
            }
        } else {
            console.log("No specific controller found for db client: "+dbClient);
            log = await this.log(log, "No specific controller found for db client: "+dbClient);
        }
    }

    async checkIfBackup(){
        let active = await this.backupSettings.getActiveStatus();
        if(active){
            let state = await this.backupSettings.getState();

            let statusCheck = "check";
            let statusFinished = "finished";
            let statusRunning = "running";
            let statusFailed = "failed";
            if(state===statusCheck && this.finished){
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
