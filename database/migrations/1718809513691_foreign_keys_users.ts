import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    this.schema.alterTable('users', (table) => {
      // Add the foreign key constraint with the cascade option
      table.foreign('team_id').references('id').inTable('teams').onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.alterTable('users', (table) => {
      // Drop the existing foreign key constraint
      try {
        table.dropForeign('team_id')
      } catch (err) {}
    })
  }
}
