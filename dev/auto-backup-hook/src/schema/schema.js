module.exports = function () {
  return 'version: 1\n' +
      'directus: 9.18.1\n' +
      'collections:\n' +
      '  - collection: auto_backup_settings\n' +
      '    meta:\n' +
      '      accountability: all\n' +
      '      archive_app_filter: true\n' +
      '      archive_field: null\n' +
      '      archive_value: archived\n' +
      '      collapse: open\n' +
      '      collection: auto_backup_settings\n' +
      '      color: null\n' +
      '      display_template: null\n' +
      '      group: null\n' +
      '      hidden: false\n' +
      '      icon: null\n' +
      '      item_duplication_fields: null\n' +
      '      note: null\n' +
      '      singleton: true\n' +
      '      sort: null\n' +
      '      sort_field: null\n' +
      '      translations: null\n' +
      '      unarchive_value: draft\n' +
      '    schema:\n' +
      '      name: auto_backup_settings\n' +
      '      sql: >-\n' +
      '        CREATE TABLE "auto_backup_settings" (`id` integer PRIMARY KEY\n' +
      '        AUTOINCREMENT NOT NULL, `user_created` char(36) NULL, `date_created`\n' +
      '        datetime NULL, `user_updated` char(36) NULL, `date_updated` datetime\n' +
      '        NULL, `DB_CLIENT` varchar(255) NULL, `state` varchar(255) NULL DEFAULT\n' +
      '        \'finished\', `active` boolean NULL DEFAULT \'0\', `latest_log` text NULL,\n' +
      '        `sqlite3_db_filename` varchar(255) NULL DEFAULT\n' +
      '        \'/directus/database/data.db\', `backup_location_type` varchar(255) NULL\n' +
      '        DEFAULT \'file_library\', `backup_location_folder_name` char(36) NULL\n' +
      '        DEFAULT \'backups\', `backup_location_folder_id` char(36) NULL DEFAULT\n' +
      '        null, `backup_file_format` varchar(255) NULL DEFAULT\n' +
      '        \'YYYY-MM-DD-HH-mm-ss-SSS\', `backup_location_custom_path` char(36) NULL\n' +
      '        DEFAULT \'/directus/database/backups\', CONSTRAINT\n' +
      '        `auto_backup_settings_user_created_foreign` FOREIGN KEY (`user_created`)\n' +
      '        REFERENCES `directus_users` (`id`), CONSTRAINT\n' +
      '        `auto_backup_settings_user_updated_foreign` FOREIGN KEY (`user_updated`)\n' +
      '        REFERENCES `directus_users` (`id`))\n' +
      'fields:\n' +
      '  - collection: auto_backup_settings\n' +
      '    field: DB_CLIENT\n' +
      '    meta:\n' +
      '      collection: auto_backup_settings\n' +
      '      conditions: null\n' +
      '      display: null\n' +
      '      display_options: null\n' +
      '      field: DB_CLIENT\n' +
      '      group: general_settings\n' +
      '      hidden: false\n' +
      '      interface: select-dropdown\n' +
      '      note: null\n' +
      '      options:\n' +
      '        allowNone: true\n' +
      '        choices:\n' +
      '          - text: sqlite3\n' +
      '            value: sqlite3\n' +
      '      readonly: false\n' +
      '      required: false\n' +
      '      sort: 7\n' +
      '      special: null\n' +
      '      translations: null\n' +
      '      validation: null\n' +
      '      validation_message: null\n' +
      '      width: full\n' +
      '    schema:\n' +
      '      data_type: varchar\n' +
      '      default_value: null\n' +
      '      foreign_key_column: null\n' +
      '      foreign_key_table: null\n' +
      '      generation_expression: null\n' +
      '      has_auto_increment: false\n' +
      '      is_generated: false\n' +
      '      is_nullable: true\n' +
      '      is_primary_key: false\n' +
      '      is_unique: false\n' +
      '      max_length: 255\n' +
      '      name: DB_CLIENT\n' +
      '      numeric_precision: null\n' +
      '      numeric_scale: null\n' +
      '      table: auto_backup_settings\n' +
      '    type: string\n' +
      '  - collection: auto_backup_settings\n' +
      '    field: active\n' +
      '    meta:\n' +
      '      collection: auto_backup_settings\n' +
      '      conditions: null\n' +
      '      display: null\n' +
      '      display_options: null\n' +
      '      field: active\n' +
      '      group: null\n' +
      '      hidden: false\n' +
      '      interface: boolean\n' +
      '      note: null\n' +
      '      options: null\n' +
      '      readonly: false\n' +
      '      required: false\n' +
      '      sort: 8\n' +
      '      special:\n' +
      '        - cast-boolean\n' +
      '      translations: null\n' +
      '      validation: null\n' +
      '      validation_message: null\n' +
      '      width: full\n' +
      '    schema:\n' +
      '      data_type: boolean\n' +
      '      default_value: false\n' +
      '      foreign_key_column: null\n' +
      '      foreign_key_table: null\n' +
      '      generation_expression: null\n' +
      '      has_auto_increment: false\n' +
      '      is_generated: false\n' +
      '      is_nullable: true\n' +
      '      is_primary_key: false\n' +
      '      is_unique: false\n' +
      '      max_length: null\n' +
      '      name: active\n' +
      '      numeric_precision: null\n' +
      '      numeric_scale: null\n' +
      '      table: auto_backup_settings\n' +
      '    type: boolean\n' +
      '  - collection: auto_backup_settings\n' +
      '    field: backup_file_format\n' +
      '    meta:\n' +
      '      collection: auto_backup_settings\n' +
      '      conditions: null\n' +
      '      display: null\n' +
      '      display_options: null\n' +
      '      field: backup_file_format\n' +
      '      group: driver_specific_settings\n' +
      '      hidden: false\n' +
      '      interface: input\n' +
      '      note: >-\n' +
      '        The default timestamp format will be: YYYY-MM-DD-HH-mm-ss-SSS e. G.\n' +
      '        2022-09-28-13-45-58-1234. Customize by using moment.js formats.\n' +
      '      options: null\n' +
      '      readonly: false\n' +
      '      required: false\n' +
      '      sort: 1\n' +
      '      special: null\n' +
      '      translations: null\n' +
      '      validation: null\n' +
      '      validation_message: null\n' +
      '      width: full\n' +
      '    schema:\n' +
      '      data_type: varchar\n' +
      '      default_value: YYYY-MM-DD-HH-mm-ss-SSS\n' +
      '      foreign_key_column: null\n' +
      '      foreign_key_table: null\n' +
      '      generation_expression: null\n' +
      '      has_auto_increment: false\n' +
      '      is_generated: false\n' +
      '      is_nullable: true\n' +
      '      is_primary_key: false\n' +
      '      is_unique: false\n' +
      '      max_length: 255\n' +
      '      name: backup_file_format\n' +
      '      numeric_precision: null\n' +
      '      numeric_scale: null\n' +
      '      table: auto_backup_settings\n' +
      '    type: string\n' +
      '  - collection: auto_backup_settings\n' +
      '    field: backup_location_custom_path\n' +
      '    meta:\n' +
      '      collection: auto_backup_settings\n' +
      '      conditions: null\n' +
      '      display: null\n' +
      '      display_options: null\n' +
      '      field: backup_location_custom_path\n' +
      '      group: backup_location_type_custom\n' +
      '      hidden: false\n' +
      '      interface: input\n' +
      '      note: \'Folder name (default: /directus/database/backups)\'\n' +
      '      options: null\n' +
      '      readonly: false\n' +
      '      required: false\n' +
      '      sort: 1\n' +
      '      special:\n' +
      '        - file\n' +
      '      translations: null\n' +
      '      validation: null\n' +
      '      validation_message: null\n' +
      '      width: full\n' +
      '    schema:\n' +
      '      data_type: char\n' +
      '      default_value: /directus/database/backups\n' +
      '      foreign_key_column: null\n' +
      '      foreign_key_table: null\n' +
      '      generation_expression: null\n' +
      '      has_auto_increment: false\n' +
      '      is_generated: false\n' +
      '      is_nullable: true\n' +
      '      is_primary_key: false\n' +
      '      is_unique: false\n' +
      '      max_length: 36\n' +
      '      name: backup_location_custom_path\n' +
      '      numeric_precision: null\n' +
      '      numeric_scale: null\n' +
      '      table: auto_backup_settings\n' +
      '    type: uuid\n' +
      '  - collection: auto_backup_settings\n' +
      '    field: backup_location_folder_id\n' +
      '    meta:\n' +
      '      collection: auto_backup_settings\n' +
      '      conditions: null\n' +
      '      display: null\n' +
      '      display_options: null\n' +
      '      field: backup_location_folder_id\n' +
      '      group: backup_location_type_file_library\n' +
      '      hidden: false\n' +
      '      interface: input\n' +
      '      note: \'Optional: ID of the folder\'\n' +
      '      options: null\n' +
      '      readonly: false\n' +
      '      required: false\n' +
      '      sort: 3\n' +
      '      special:\n' +
      '        - file\n' +
      '      translations: null\n' +
      '      validation: null\n' +
      '      validation_message: null\n' +
      '      width: half\n' +
      '    schema:\n' +
      '      data_type: char\n' +
      '      default_value: null\n' +
      '      foreign_key_column: null\n' +
      '      foreign_key_table: null\n' +
      '      generation_expression: null\n' +
      '      has_auto_increment: false\n' +
      '      is_generated: false\n' +
      '      is_nullable: true\n' +
      '      is_primary_key: false\n' +
      '      is_unique: false\n' +
      '      max_length: 36\n' +
      '      name: backup_location_folder_id\n' +
      '      numeric_precision: null\n' +
      '      numeric_scale: null\n' +
      '      table: auto_backup_settings\n' +
      '    type: uuid\n' +
      '  - collection: auto_backup_settings\n' +
      '    field: backup_location_folder_name\n' +
      '    meta:\n' +
      '      collection: auto_backup_settings\n' +
      '      conditions: null\n' +
      '      display: null\n' +
      '      display_options: null\n' +
      '      field: backup_location_folder_name\n' +
      '      group: backup_location_type_file_library\n' +
      '      hidden: false\n' +
      '      interface: input\n' +
      '      note: \'Backup folder name (default: backups)\'\n' +
      '      options: null\n' +
      '      readonly: false\n' +
      '      required: false\n' +
      '      sort: 1\n' +
      '      special:\n' +
      '        - file\n' +
      '      translations: null\n' +
      '      validation: null\n' +
      '      validation_message: null\n' +
      '      width: half\n' +
      '    schema:\n' +
      '      data_type: char\n' +
      '      default_value: backups\n' +
      '      foreign_key_column: null\n' +
      '      foreign_key_table: null\n' +
      '      generation_expression: null\n' +
      '      has_auto_increment: false\n' +
      '      is_generated: false\n' +
      '      is_nullable: true\n' +
      '      is_primary_key: false\n' +
      '      is_unique: false\n' +
      '      max_length: 36\n' +
      '      name: backup_location_folder_name\n' +
      '      numeric_precision: null\n' +
      '      numeric_scale: null\n' +
      '      table: auto_backup_settings\n' +
      '    type: uuid\n' +
      '  - collection: auto_backup_settings\n' +
      '    field: backup_location_type\n' +
      '    meta:\n' +
      '      collection: auto_backup_settings\n' +
      '      conditions: null\n' +
      '      display: null\n' +
      '      display_options: null\n' +
      '      field: backup_location_type\n' +
      '      group: general_settings\n' +
      '      hidden: false\n' +
      '      interface: select-dropdown\n' +
      '      note: Select how/where backups should be saved\n' +
      '      options:\n' +
      '        allowNone: true\n' +
      '        choices:\n' +
      '          - text: File Library\n' +
      '            value: file_library\n' +
      '          - text: Custom Path\n' +
      '            value: custom_path\n' +
      '      readonly: false\n' +
      '      required: false\n' +
      '      sort: 3\n' +
      '      special: null\n' +
      '      translations: null\n' +
      '      validation: null\n' +
      '      validation_message: null\n' +
      '      width: full\n' +
      '    schema:\n' +
      '      data_type: varchar\n' +
      '      default_value: file_library\n' +
      '      foreign_key_column: null\n' +
      '      foreign_key_table: null\n' +
      '      generation_expression: null\n' +
      '      has_auto_increment: false\n' +
      '      is_generated: false\n' +
      '      is_nullable: true\n' +
      '      is_primary_key: false\n' +
      '      is_unique: false\n' +
      '      max_length: 255\n' +
      '      name: backup_location_type\n' +
      '      numeric_precision: null\n' +
      '      numeric_scale: null\n' +
      '      table: auto_backup_settings\n' +
      '    type: string\n' +
      '  - collection: auto_backup_settings\n' +
      '    field: backup_location_type_custom\n' +
      '    meta:\n' +
      '      collection: auto_backup_settings\n' +
      '      conditions:\n' +
      '        - name: Visible\n' +
      '          rule:\n' +
      '            _and:\n' +
      '              - backup_location_type:\n' +
      '                  _neq: custom_path\n' +
      '          options: {}\n' +
      '          hidden: true\n' +
      '      display: null\n' +
      '      display_options: null\n' +
      '      field: backup_location_type_custom\n' +
      '      group: general_settings\n' +
      '      hidden: false\n' +
      '      interface: group-raw\n' +
      '      note: null\n' +
      '      options: null\n' +
      '      readonly: false\n' +
      '      required: false\n' +
      '      sort: 4\n' +
      '      special:\n' +
      '        - alias\n' +
      '        - group\n' +
      '        - no-data\n' +
      '      translations: null\n' +
      '      validation: null\n' +
      '      validation_message: null\n' +
      '      width: full\n' +
      '    schema: null\n' +
      '    type: alias\n' +
      '  - collection: auto_backup_settings\n' +
      '    field: backup_location_type_file_library\n' +
      '    meta:\n' +
      '      collection: auto_backup_settings\n' +
      '      conditions:\n' +
      '        - name: Vsisible\n' +
      '          rule:\n' +
      '            _and:\n' +
      '              - backup_location_type:\n' +
      '                  _neq: file_library\n' +
      '          options: {}\n' +
      '          hidden: true\n' +
      '      display: null\n' +
      '      display_options: null\n' +
      '      field: backup_location_type_file_library\n' +
      '      group: general_settings\n' +
      '      hidden: false\n' +
      '      interface: group-raw\n' +
      '      note: null\n' +
      '      options: null\n' +
      '      readonly: false\n' +
      '      required: false\n' +
      '      sort: 5\n' +
      '      special:\n' +
      '        - alias\n' +
      '        - group\n' +
      '        - no-data\n' +
      '      translations: null\n' +
      '      validation: null\n' +
      '      validation_message: null\n' +
      '      width: full\n' +
      '    schema: null\n' +
      '    type: alias\n' +
      '  - collection: auto_backup_settings\n' +
      '    field: date_created\n' +
      '    meta:\n' +
      '      collection: auto_backup_settings\n' +
      '      conditions: null\n' +
      '      display: datetime\n' +
      '      display_options:\n' +
      '        relative: true\n' +
      '      field: date_created\n' +
      '      group: null\n' +
      '      hidden: true\n' +
      '      interface: datetime\n' +
      '      note: null\n' +
      '      options: null\n' +
      '      readonly: true\n' +
      '      required: false\n' +
      '      sort: 3\n' +
      '      special:\n' +
      '        - cast-timestamp\n' +
      '        - date-created\n' +
      '      translations: null\n' +
      '      validation: null\n' +
      '      validation_message: null\n' +
      '      width: half\n' +
      '    schema:\n' +
      '      data_type: datetime\n' +
      '      default_value: null\n' +
      '      foreign_key_column: null\n' +
      '      foreign_key_table: null\n' +
      '      generation_expression: null\n' +
      '      has_auto_increment: false\n' +
      '      is_generated: false\n' +
      '      is_nullable: true\n' +
      '      is_primary_key: false\n' +
      '      is_unique: false\n' +
      '      max_length: null\n' +
      '      name: date_created\n' +
      '      numeric_precision: null\n' +
      '      numeric_scale: null\n' +
      '      table: auto_backup_settings\n' +
      '    type: timestamp\n' +
      '  - collection: auto_backup_settings\n' +
      '    field: date_updated\n' +
      '    meta:\n' +
      '      collection: auto_backup_settings\n' +
      '      conditions: null\n' +
      '      display: datetime\n' +
      '      display_options:\n' +
      '        relative: true\n' +
      '      field: date_updated\n' +
      '      group: null\n' +
      '      hidden: true\n' +
      '      interface: datetime\n' +
      '      note: null\n' +
      '      options: null\n' +
      '      readonly: true\n' +
      '      required: false\n' +
      '      sort: 5\n' +
      '      special:\n' +
      '        - cast-timestamp\n' +
      '        - date-updated\n' +
      '      translations: null\n' +
      '      validation: null\n' +
      '      validation_message: null\n' +
      '      width: half\n' +
      '    schema:\n' +
      '      data_type: datetime\n' +
      '      default_value: null\n' +
      '      foreign_key_column: null\n' +
      '      foreign_key_table: null\n' +
      '      generation_expression: null\n' +
      '      has_auto_increment: false\n' +
      '      is_generated: false\n' +
      '      is_nullable: true\n' +
      '      is_primary_key: false\n' +
      '      is_unique: false\n' +
      '      max_length: null\n' +
      '      name: date_updated\n' +
      '      numeric_precision: null\n' +
      '      numeric_scale: null\n' +
      '      table: auto_backup_settings\n' +
      '    type: timestamp\n' +
      '  - collection: auto_backup_settings\n' +
      '    field: divide_to_database_type\n' +
      '    meta:\n' +
      '      collection: auto_backup_settings\n' +
      '      conditions: null\n' +
      '      display: null\n' +
      '      display_options: null\n' +
      '      field: divide_to_database_type\n' +
      '      group: general_settings\n' +
      '      hidden: false\n' +
      '      interface: presentation-divider\n' +
      '      note: null\n' +
      '      options:\n' +
      '        inlineTitle: true\n' +
      '        title: Database driver\n' +
      '      readonly: false\n' +
      '      required: false\n' +
      '      sort: 6\n' +
      '      special:\n' +
      '        - alias\n' +
      '        - no-data\n' +
      '      translations: null\n' +
      '      validation: null\n' +
      '      validation_message: null\n' +
      '      width: full\n' +
      '    schema: null\n' +
      '    type: alias\n' +
      '  - collection: auto_backup_settings\n' +
      '    field: divider-oql-hz\n' +
      '    meta:\n' +
      '      collection: auto_backup_settings\n' +
      '      conditions: null\n' +
      '      display: null\n' +
      '      display_options: null\n' +
      '      field: divider-oql-hz\n' +
      '      group: null\n' +
      '      hidden: false\n' +
      '      interface: presentation-divider\n' +
      '      note: null\n' +
      '      options: null\n' +
      '      readonly: false\n' +
      '      required: false\n' +
      '      sort: 7\n' +
      '      special:\n' +
      '        - alias\n' +
      '        - no-data\n' +
      '      translations: null\n' +
      '      validation: null\n' +
      '      validation_message: null\n' +
      '      width: full\n' +
      '    schema: null\n' +
      '    type: alias\n' +
      '  - collection: auto_backup_settings\n' +
      '    field: divider-qtbpzx\n' +
      '    meta:\n' +
      '      collection: auto_backup_settings\n' +
      '      conditions: null\n' +
      '      display: null\n' +
      '      display_options: null\n' +
      '      field: divider-qtbpzx\n' +
      '      group: general_settings\n' +
      '      hidden: false\n' +
      '      interface: presentation-divider\n' +
      '      note: null\n' +
      '      options: null\n' +
      '      readonly: false\n' +
      '      required: false\n' +
      '      sort: 9\n' +
      '      special:\n' +
      '        - alias\n' +
      '        - no-data\n' +
      '      translations: null\n' +
      '      validation: null\n' +
      '      validation_message: null\n' +
      '      width: full\n' +
      '    schema: null\n' +
      '    type: alias\n' +
      '  - collection: auto_backup_settings\n' +
      '    field: divider_to_backup_location\n' +
      '    meta:\n' +
      '      collection: auto_backup_settings\n' +
      '      conditions: null\n' +
      '      display: null\n' +
      '      display_options: null\n' +
      '      field: divider_to_backup_location\n' +
      '      group: general_settings\n' +
      '      hidden: false\n' +
      '      interface: presentation-divider\n' +
      '      note: null\n' +
      '      options:\n' +
      '        inlineTitle: true\n' +
      '        title: Backup location\n' +
      '      readonly: false\n' +
      '      required: false\n' +
      '      sort: 2\n' +
      '      special:\n' +
      '        - alias\n' +
      '        - no-data\n' +
      '      translations: null\n' +
      '      validation: null\n' +
      '      validation_message: null\n' +
      '      width: full\n' +
      '    schema: null\n' +
      '    type: alias\n' +
      '  - collection: auto_backup_settings\n' +
      '    field: driver_specific_settings\n' +
      '    meta:\n' +
      '      collection: auto_backup_settings\n' +
      '      conditions:\n' +
      '        - name: Visible\n' +
      '          rule:\n' +
      '            _and:\n' +
      '              - DB_CLIENT:\n' +
      '                  _null: true\n' +
      '          hidden: true\n' +
      '          options: {}\n' +
      '      display: null\n' +
      '      display_options: null\n' +
      '      field: driver_specific_settings\n' +
      '      group: general_settings\n' +
      '      hidden: false\n' +
      '      interface: group-raw\n' +
      '      note: null\n' +
      '      options: null\n' +
      '      readonly: false\n' +
      '      required: false\n' +
      '      sort: 8\n' +
      '      special:\n' +
      '        - alias\n' +
      '        - group\n' +
      '        - no-data\n' +
      '      translations: null\n' +
      '      validation: null\n' +
      '      validation_message: null\n' +
      '      width: full\n' +
      '    schema: null\n' +
      '    type: alias\n' +
      '  - collection: auto_backup_settings\n' +
      '    field: general_settings\n' +
      '    meta:\n' +
      '      collection: auto_backup_settings\n' +
      '      conditions:\n' +
      '        - name: Open\n' +
      '          rule:\n' +
      '            _and:\n' +
      '              - active:\n' +
      '                  _eq: false\n' +
      '          options:\n' +
      '            start: open\n' +
      '      display: null\n' +
      '      display_options: null\n' +
      '      field: general_settings\n' +
      '      group: null\n' +
      '      hidden: false\n' +
      '      interface: group-detail\n' +
      '      note: null\n' +
      '      options:\n' +
      '        start: closed\n' +
      '      readonly: false\n' +
      '      required: false\n' +
      '      sort: 6\n' +
      '      special:\n' +
      '        - alias\n' +
      '        - group\n' +
      '        - no-data\n' +
      '      translations: null\n' +
      '      validation: null\n' +
      '      validation_message: null\n' +
      '      width: full\n' +
      '    schema: null\n' +
      '    type: alias\n' +
      '  - collection: auto_backup_settings\n' +
      '    field: id\n' +
      '    meta:\n' +
      '      collection: auto_backup_settings\n' +
      '      conditions: null\n' +
      '      display: null\n' +
      '      display_options: null\n' +
      '      field: id\n' +
      '      group: null\n' +
      '      hidden: true\n' +
      '      interface: input\n' +
      '      note: null\n' +
      '      options: null\n' +
      '      readonly: true\n' +
      '      required: false\n' +
      '      sort: 1\n' +
      '      special: null\n' +
      '      translations: null\n' +
      '      validation: null\n' +
      '      validation_message: null\n' +
      '      width: full\n' +
      '    schema:\n' +
      '      data_type: integer\n' +
      '      default_value: null\n' +
      '      foreign_key_column: null\n' +
      '      foreign_key_table: null\n' +
      '      generation_expression: null\n' +
      '      has_auto_increment: true\n' +
      '      is_generated: false\n' +
      '      is_nullable: false\n' +
      '      is_primary_key: true\n' +
      '      is_unique: false\n' +
      '      max_length: null\n' +
      '      name: id\n' +
      '      numeric_precision: null\n' +
      '      numeric_scale: null\n' +
      '      table: auto_backup_settings\n' +
      '    type: integer\n' +
      '  - collection: auto_backup_settings\n' +
      '    field: latest_log\n' +
      '    meta:\n' +
      '      collection: auto_backup_settings\n' +
      '      conditions: null\n' +
      '      display: null\n' +
      '      display_options: null\n' +
      '      field: latest_log\n' +
      '      group: visibility_active\n' +
      '      hidden: false\n' +
      '      interface: input-multiline\n' +
      '      note: null\n' +
      '      options: null\n' +
      '      readonly: false\n' +
      '      required: false\n' +
      '      sort: 1\n' +
      '      special: null\n' +
      '      translations: null\n' +
      '      validation: null\n' +
      '      validation_message: null\n' +
      '      width: full\n' +
      '    schema:\n' +
      '      data_type: text\n' +
      '      default_value: null\n' +
      '      foreign_key_column: null\n' +
      '      foreign_key_table: null\n' +
      '      generation_expression: null\n' +
      '      has_auto_increment: false\n' +
      '      is_generated: false\n' +
      '      is_nullable: true\n' +
      '      is_primary_key: false\n' +
      '      is_unique: false\n' +
      '      max_length: null\n' +
      '      name: latest_log\n' +
      '      numeric_precision: null\n' +
      '      numeric_scale: null\n' +
      '      table: auto_backup_settings\n' +
      '    type: text\n' +
      '  - collection: auto_backup_settings\n' +
      '    field: notice_finished\n' +
      '    meta:\n' +
      '      collection: auto_backup_settings\n' +
      '      conditions: null\n' +
      '      display: null\n' +
      '      display_options: null\n' +
      '      field: notice_finished\n' +
      '      group: general_settings\n' +
      '      hidden: false\n' +
      '      interface: presentation-notice\n' +
      '      note: null\n' +
      '      options:\n' +
      '        text: After this setup, you only need to active the next field ACTIVE\n' +
      '      readonly: false\n' +
      '      required: false\n' +
      '      sort: 10\n' +
      '      special:\n' +
      '        - alias\n' +
      '        - no-data\n' +
      '      translations: null\n' +
      '      validation: null\n' +
      '      validation_message: null\n' +
      '      width: full\n' +
      '    schema: null\n' +
      '    type: alias\n' +
      '  - collection: auto_backup_settings\n' +
      '    field: notice_welcome\n' +
      '    meta:\n' +
      '      collection: auto_backup_settings\n' +
      '      conditions: null\n' +
      '      display: null\n' +
      '      display_options: null\n' +
      '      field: notice_welcome\n' +
      '      group: general_settings\n' +
      '      hidden: false\n' +
      '      interface: presentation-notice\n' +
      '      note: null\n' +
      '      options:\n' +
      '        text: >-\n' +
      '          Welcome to the auto backup extension. Please configure this setup.\n' +
      '          After that set the field ACTIVE to true\n' +
      '      readonly: false\n' +
      '      required: false\n' +
      '      sort: 1\n' +
      '      special:\n' +
      '        - alias\n' +
      '        - no-data\n' +
      '      translations: null\n' +
      '      validation: null\n' +
      '      validation_message: null\n' +
      '      width: full\n' +
      '    schema: null\n' +
      '    type: alias\n' +
      '  - collection: auto_backup_settings\n' +
      '    field: sqlite3_db_filename\n' +
      '    meta:\n' +
      '      collection: auto_backup_settings\n' +
      '      conditions: null\n' +
      '      display: null\n' +
      '      display_options: null\n' +
      '      field: sqlite3_db_filename\n' +
      '      group: sqlite3_settings\n' +
      '      hidden: false\n' +
      '      interface: input\n' +
      '      note: >-\n' +
      '        Default from:\n' +
      '        https://docs.directus.io/self-hosted/installation/docker.html\n' +
      '      options: null\n' +
      '      readonly: false\n' +
      '      required: false\n' +
      '      sort: 1\n' +
      '      special: null\n' +
      '      translations: null\n' +
      '      validation: null\n' +
      '      validation_message: null\n' +
      '      width: full\n' +
      '    schema:\n' +
      '      data_type: varchar\n' +
      '      default_value: /directus/database/data.db\n' +
      '      foreign_key_column: null\n' +
      '      foreign_key_table: null\n' +
      '      generation_expression: null\n' +
      '      has_auto_increment: false\n' +
      '      is_generated: false\n' +
      '      is_nullable: true\n' +
      '      is_primary_key: false\n' +
      '      is_unique: false\n' +
      '      max_length: 255\n' +
      '      name: sqlite3_db_filename\n' +
      '      numeric_precision: null\n' +
      '      numeric_scale: null\n' +
      '      table: auto_backup_settings\n' +
      '    type: string\n' +
      '  - collection: auto_backup_settings\n' +
      '    field: sqlite3_settings\n' +
      '    meta:\n' +
      '      collection: auto_backup_settings\n' +
      '      conditions:\n' +
      '        - rule:\n' +
      '            _and:\n' +
      '              - DB_CLIENT:\n' +
      '                  _neq: sqlite3\n' +
      '          readonly: false\n' +
      '          hidden: true\n' +
      '          required: false\n' +
      '          options: {}\n' +
      '          name: Visibility\n' +
      '      display: null\n' +
      '      display_options: null\n' +
      '      field: sqlite3_settings\n' +
      '      group: driver_specific_settings\n' +
      '      hidden: false\n' +
      '      interface: group-raw\n' +
      '      note: null\n' +
      '      options: null\n' +
      '      readonly: false\n' +
      '      required: false\n' +
      '      sort: 2\n' +
      '      special:\n' +
      '        - alias\n' +
      '        - group\n' +
      '        - no-data\n' +
      '      translations: null\n' +
      '      validation: null\n' +
      '      validation_message: null\n' +
      '      width: full\n' +
      '    schema: null\n' +
      '    type: alias\n' +
      '  - collection: auto_backup_settings\n' +
      '    field: state\n' +
      '    meta:\n' +
      '      collection: auto_backup_settings\n' +
      '      conditions: null\n' +
      '      display: null\n' +
      '      display_options: null\n' +
      '      field: state\n' +
      '      group: null\n' +
      '      hidden: false\n' +
      '      interface: select-dropdown\n' +
      '      note: >-\n' +
      '        If you want to run auto backups, just create a directus flow and change\n' +
      '        the field \'state\' to the value \'check\'\n' +
      '      options:\n' +
      '        choices:\n' +
      '          - text: check <-- manual start\n' +
      '            value: check\n' +
      '          - text: running\n' +
      '            value: running\n' +
      '          - text: finished\n' +
      '            value: finished\n' +
      '          - text: failed\n' +
      '            value: failed\n' +
      '      readonly: false\n' +
      '      required: false\n' +
      '      sort: 9\n' +
      '      special: null\n' +
      '      translations: null\n' +
      '      validation: null\n' +
      '      validation_message: null\n' +
      '      width: full\n' +
      '    schema:\n' +
      '      data_type: varchar\n' +
      '      default_value: finished\n' +
      '      foreign_key_column: null\n' +
      '      foreign_key_table: null\n' +
      '      generation_expression: null\n' +
      '      has_auto_increment: false\n' +
      '      is_generated: false\n' +
      '      is_nullable: true\n' +
      '      is_primary_key: false\n' +
      '      is_unique: false\n' +
      '      max_length: 255\n' +
      '      name: state\n' +
      '      numeric_precision: null\n' +
      '      numeric_scale: null\n' +
      '      table: auto_backup_settings\n' +
      '    type: string\n' +
      '  - collection: auto_backup_settings\n' +
      '    field: user_created\n' +
      '    meta:\n' +
      '      collection: auto_backup_settings\n' +
      '      conditions: null\n' +
      '      display: user\n' +
      '      display_options: null\n' +
      '      field: user_created\n' +
      '      group: null\n' +
      '      hidden: true\n' +
      '      interface: select-dropdown-m2o\n' +
      '      note: null\n' +
      '      options:\n' +
      '        template: \'{{avatar.$thumbnail}} {{first_name}} {{last_name}}\'\n' +
      '      readonly: true\n' +
      '      required: false\n' +
      '      sort: 2\n' +
      '      special:\n' +
      '        - user-created\n' +
      '      translations: null\n' +
      '      validation: null\n' +
      '      validation_message: null\n' +
      '      width: half\n' +
      '    schema:\n' +
      '      data_type: char\n' +
      '      default_value: null\n' +
      '      foreign_key_column: id\n' +
      '      foreign_key_table: directus_users\n' +
      '      generation_expression: null\n' +
      '      has_auto_increment: false\n' +
      '      is_generated: false\n' +
      '      is_nullable: true\n' +
      '      is_primary_key: false\n' +
      '      is_unique: false\n' +
      '      max_length: 36\n' +
      '      name: user_created\n' +
      '      numeric_precision: null\n' +
      '      numeric_scale: null\n' +
      '      table: auto_backup_settings\n' +
      '    type: string\n' +
      '  - collection: auto_backup_settings\n' +
      '    field: user_updated\n' +
      '    meta:\n' +
      '      collection: auto_backup_settings\n' +
      '      conditions: null\n' +
      '      display: user\n' +
      '      display_options: null\n' +
      '      field: user_updated\n' +
      '      group: null\n' +
      '      hidden: true\n' +
      '      interface: select-dropdown-m2o\n' +
      '      note: null\n' +
      '      options:\n' +
      '        template: \'{{avatar.$thumbnail}} {{first_name}} {{last_name}}\'\n' +
      '      readonly: true\n' +
      '      required: false\n' +
      '      sort: 4\n' +
      '      special:\n' +
      '        - user-updated\n' +
      '      translations: null\n' +
      '      validation: null\n' +
      '      validation_message: null\n' +
      '      width: half\n' +
      '    schema:\n' +
      '      data_type: char\n' +
      '      default_value: null\n' +
      '      foreign_key_column: id\n' +
      '      foreign_key_table: directus_users\n' +
      '      generation_expression: null\n' +
      '      has_auto_increment: false\n' +
      '      is_generated: false\n' +
      '      is_nullable: true\n' +
      '      is_primary_key: false\n' +
      '      is_unique: false\n' +
      '      max_length: 36\n' +
      '      name: user_updated\n' +
      '      numeric_precision: null\n' +
      '      numeric_scale: null\n' +
      '      table: auto_backup_settings\n' +
      '    type: string\n' +
      '  - collection: auto_backup_settings\n' +
      '    field: visibility_active\n' +
      '    meta:\n' +
      '      collection: auto_backup_settings\n' +
      '      conditions:\n' +
      '        - name: Visibility\n' +
      '          rule:\n' +
      '            _and:\n' +
      '              - active:\n' +
      '                  _eq: true\n' +
      '          options: {}\n' +
      '      display: null\n' +
      '      display_options: null\n' +
      '      field: visibility_active\n' +
      '      group: null\n' +
      '      hidden: false\n' +
      '      interface: group-raw\n' +
      '      note: null\n' +
      '      options: null\n' +
      '      readonly: false\n' +
      '      required: false\n' +
      '      sort: 10\n' +
      '      special:\n' +
      '        - alias\n' +
      '        - group\n' +
      '        - no-data\n' +
      '      translations: null\n' +
      '      validation: null\n' +
      '      validation_message: null\n' +
      '      width: full\n' +
      '    schema: null\n' +
      '    type: alias\n' +
      'relations:\n' +
      '  - collection: auto_backup_settings\n' +
      '    field: user_created\n' +
      '    meta:\n' +
      '      junction_field: null\n' +
      '      many_collection: auto_backup_settings\n' +
      '      many_field: user_created\n' +
      '      one_allowed_collections: null\n' +
      '      one_collection: directus_users\n' +
      '      one_collection_field: null\n' +
      '      one_deselect_action: nullify\n' +
      '      one_field: null\n' +
      '      sort_field: null\n' +
      '    related_collection: directus_users\n' +
      '    schema:\n' +
      '      column: user_created\n' +
      '      constraint_name: null\n' +
      '      foreign_key_column: id\n' +
      '      foreign_key_table: directus_users\n' +
      '      on_delete: NO ACTION\n' +
      '      on_update: NO ACTION\n' +
      '      table: auto_backup_settings\n' +
      '  - collection: auto_backup_settings\n' +
      '    field: user_updated\n' +
      '    meta:\n' +
      '      junction_field: null\n' +
      '      many_collection: auto_backup_settings\n' +
      '      many_field: user_updated\n' +
      '      one_allowed_collections: null\n' +
      '      one_collection: directus_users\n' +
      '      one_collection_field: null\n' +
      '      one_deselect_action: nullify\n' +
      '      one_field: null\n' +
      '      sort_field: null\n' +
      '    related_collection: directus_users\n' +
      '    schema:\n' +
      '      column: user_updated\n' +
      '      constraint_name: null\n' +
      '      foreign_key_column: id\n' +
      '      foreign_key_table: directus_users\n' +
      '      on_delete: NO ACTION\n' +
      '      on_update: NO ACTION\n' +
      '      table: auto_backup_settings\n'
};
