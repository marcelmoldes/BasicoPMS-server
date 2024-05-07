import { BaseSchema } from '@adonisjs/lucid/schema'
import vine from '@vinejs/vine'

export default class extends BaseSchema {
  protected tableName = 'tasks'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.integer('project_id').notNullable()
      table.string('name', 65).notNullable()
      table.text('description').notNullable()
      table.string('status', 30).notNullable()
      table.string('priority', 35).notNullable()
      table.date('start_date').nullable()
      table.date('due_date').nullable()
      table.date('completion_date').nullable()
      table.decimal('completion_percentage').notNullable()
      table.integer('owner_id').notNullable()
      table.datetime('created_at').notNullable()
      table.datetime('updated_at').notNullable()
      table.integer('team_id').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
