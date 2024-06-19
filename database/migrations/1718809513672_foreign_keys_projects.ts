import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    this.schema.alterTable('projects', (table) => {
      // Add the foreign key constraint with the cascade option

      table.foreign('team_id').references('id').inTable('teams').onDelete('CASCADE')
      table.foreign('owner_id').references('id').inTable('users').onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.alterTable('projects', (table) => {
      // Drop the existing foreign key constraint
      try {
        table.dropForeign('team_id')
        table.dropForeign('owner_id')
      } catch (err) {}
    })
  }
}
