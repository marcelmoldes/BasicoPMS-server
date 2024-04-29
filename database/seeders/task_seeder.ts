import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Task from '#models/task'

export default class extends BaseSeeder {
  async run() {
    await Task.createMany([
      {
        projectId: 1,
        name: 'Task test',
        description: 'this is ae tst task',
        priority: 'high',
        status: 'in_progress',
        completionPercentage: 0,
        ownerId: 1,
      },
    ])
  }
}
