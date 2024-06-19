import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    this.schema.alterTable('tasks', (table) => {
      // Add the foreign key constraint with the cascade option
      table.foreign('project_id').references('id').inTable('projects').onDelete('CASCADE')
      table.foreign('team_id').references('id').inTable('teams').onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.alterTable('tasks', (table) => {
      // Drop the existing foreign key constraint
      try {
        table.dropForeign('project_id')
        table.dropForeign('team_id')
      } catch (err) {}
    })
  }
}
