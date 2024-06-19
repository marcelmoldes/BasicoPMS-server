import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    this.schema.alterTable('attachments', (table) => {
      // Add the foreign key constraint with the cascade option
      table.foreign('task_id').references('id').inTable('tasks').onDelete('CASCADE')
      table.foreign('team_id').references('id').inTable('teams').onDelete('CASCADE')
      table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE')
      table.foreign('comment_id').references('id').inTable('comments').onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.alterTable('attachments', (table) => {
      // Drop the existing foreign key constraint
      try {
        table.dropForeign('team_id')
        table.dropForeign('task_id')
        table.dropForeign('user_id')
        table.dropForeign('comment_id')
      } catch (err) {}
    })
  }
}
