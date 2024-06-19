import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'projects'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('name', 100).notNullable()
      table.string('description', 400).nullable()
      table.date('start_date')
      table.date('end_date')
      table.boolean('deleted').defaultTo(false)
      table.integer('owner_id').notNullable().unsigned()
      table.integer('team_id').notNullable().unsigned()
      table.string('status').notNullable()
      table.datetime('created_at').notNullable()
      table.datetime('updated_at').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
