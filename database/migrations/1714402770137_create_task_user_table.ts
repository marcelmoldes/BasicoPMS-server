import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'task_users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('task_id').notNullable()
      table.integer('user_id').notNullable()
      table.date('assigned_date').notNullable()
      table.datetime('created_at').notNullable()
      table.datetime('updated_at').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
