import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'projects'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('name', 100).notNullable()
      table.string('description', 400).nullable()
      table.date('start_date').notNullable()
      table.date('end_date').notNullable()
      table.integer('owner_id').notNullable()
      table.integer('team_id').notNullable()
      table.string('status').notNullable()
      table.datetime('created_at').notNullable()
      table.datetime('updated_at').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
