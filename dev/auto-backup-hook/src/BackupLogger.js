module.exports = class BackupLogger {

    constructor(backupSettings) {
        this.backupSettings = backupSettings;
        this.currentLog = "";
    }

    async resetLog(){
        this.currentLog = "";
        await this.backupSettings.setLatestLog("")
    }

    async log(log){
        let now = new Date();
        this.currentLog = this.currentLog + "\n "+ now.toISOString()+": " + log;
        await this.backupSettings.setLatestLog(this.currentLog);
    }

}
