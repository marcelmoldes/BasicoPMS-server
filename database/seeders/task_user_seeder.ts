import { BaseSeeder } from '@adonisjs/lucid/seeders'
import TaskUser from '#models/task_user'
import { faker } from '@faker-js/faker'

export default class extends BaseSeeder {
  async run() {
    for (let i = 0; i < 100; i++) {
      await TaskUser.create({
        userId: faker.number.int(100),
        taskId: faker.number.int(100),
        assignedDate: faker.date.anytime(),
      })
    }
  }
}
