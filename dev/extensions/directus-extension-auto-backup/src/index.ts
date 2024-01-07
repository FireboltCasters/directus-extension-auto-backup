import { defineHook } from '@directus/extensions-sdk';

import {CollectionsServiceCreator} from "./helper/CollectionsServiceCreator.js";
import {BackupSettings} from "./BackupSettings.js";
import getSettingsSchema from "./schema/schema.js";
import yaml from "js-yaml"
import {BackupController} from "./BackupController";

async function checkSettingsCollection(services, database, schema) {
	const settingsSchemaYAML = getSettingsSchema();
	const settingsSchema = yaml.load(settingsSchemaYAML);

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


export default defineHook(({filter, action, init, schedule}, {
	services,
	database,
	getSchema,
	logger
}) => {
	console.log("Init auto backup")

	action(
		"server.start",
		async (meta, context) => {
			let schema = await getSchema();
			await checkSettingsCollection(services, database, schema)
		}
	)



	action(
		BackupSettings.TABLENAME + ".items.update",
		async (meta, context) => {
			let schema = await getSchema();

			let backupController = new BackupController(services, database, schema);
			await backupController.init();
			//TODO check if field "parse_meals" is active
			try {
				await backupController.checkIfBackup();
			} catch (err) {
				console.log(err);
			}
			//TODO set field "parse_meals" to false
		}
	);
});
