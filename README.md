<h2 align="center">
    Directus Extension Auto Backup
</h2>
<p align="center">
    <img src="https://raw.githubusercontent.com/FireboltCasters/directus-extension-auto-backup/master/assets/copy-small.gif" alt="backup" style="height:150px;"/>
</p>

<p align="center">
  <a href="https://badge.fury.io/js/directus-extension-auto-backup.svg"><img src="https://badge.fury.io/js/directus-extension-auto-backup.svg" alt="npm package" /></a>
  <a href="https://img.shields.io/github/license/FireboltCasters/directus-extension-auto-backup"><img src="https://img.shields.io/github/license/FireboltCasters/directus-extension-auto-backup" alt="MIT" /></a>
  <a href="https://img.shields.io/github/last-commit/FireboltCasters/directus-extension-auto-backup?logo=git"><img src="https://img.shields.io/github/last-commit/FireboltCasters/directus-extension-auto-backup?logo=git" alt="last commit" /></a>
  <a href="https://www.npmjs.com/package/directus-extension-auto-backup"><img src="https://img.shields.io/npm/dm/directus-extension-auto-backup.svg" alt="downloads week" /></a>
  <a href="https://www.npmjs.com/package/directus-extension-auto-backup"><img src="https://img.shields.io/npm/dt/directus-extension-auto-backup.svg" alt="downloads total" /></a>
  <a href="https://github.com/FireboltCasters/directus-extension-auto-backup"><img src="https://shields.io/github/languages/code-size/FireboltCasters/directus-extension-auto-backup" alt="size" /></a>
  <a href="https://github.com/FireboltCasters/directus-extension-auto-backup/actions/workflows/npmPublish.yml"><img src="https://github.com/FireboltCasters/directus-extension-auto-backup/actions/workflows/npmPublish.yml/badge.svg" alt="Npm publish" /></a>
</p>

<p align="center">
    directus-extension-auto-backup
</p>

### About

This extension automatically makes backups of your database for you.

Supported databases:
- SQLite

### Help Wanted

In order to support more databases, we need help. If you know how to make a backup of a database, please open an issue and we will add you as a contributor, or you can open a pull request.


### Installation

1. Backup your database! :D
2. Install the extension
    - Normal project
        ```
        cd <directus-project-folder>
        npm install directus-extension-auto-backup
        ```
   - Docker-Compose
        Install ist 
        In your docker-compose.yml modify your container:
        ```
        directus:
            image: directus/directus:9.16.1
            command: >
                sh -c "
                npm install directus-extension-auto-backup && 
                npx directus bootstrap && echo 'Node' && 
                node node_modules/directus/dist/start.js
                "
            ...
        ...
        ```
        
3. Restart the server twice
   1. First time maybe your database is not ready yet
   2. Second time the extension should be installed
4. Go to the extensions page and setup the extension 
   - A new table called `auto_backup_settings` should be created
   - visit `http://0.0.0.0:8055/admin/content/auto_backup_settings`

   <img src="https://raw.githubusercontent.com/FireboltCasters/directus-extension-auto-backup/master/assets/autoBackupExample.png" alt="example" style="height:150px;"/>


## Contributors

The FireboltCasters

<a href="https://github.com/FireboltCasters/directus-extension-auto-backup"><img src="https://contrib.rocks/image?repo=FireboltCasters/directus-extension-auto-backup" alt="Contributors" /></a>
