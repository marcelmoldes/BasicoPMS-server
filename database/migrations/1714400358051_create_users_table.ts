import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('first_name', 50).notNullable()
      table.string('last_name', 100).notNullable()
      table.integer('team_id').notNullable().unsigned()
      table.string('email', 200).notNullable()
      table.string('password', 255).notNullable()
      table.string('role', 50).notNullable()
      table.datetime('created_at').notNullable()
      table.datetime('updated_at').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
