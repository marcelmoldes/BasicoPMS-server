import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Task from '#models/task'
import { faker } from '@faker-js/faker'

export default class extends BaseSeeder {
  async run() {
    for (let i = 0; i < 10; i++) {
      const task = await Task.create({
        name: faker.company.name(),
        projectId: 1,
        description: faker.commerce.productDescription(),
        priority: faker.company.buzzVerb(),
        status: faker.number.int({ min: 0, max: 1 }) % 2 ? 'open' : 'closed',
        startDate: faker.date.anytime(),
        dueDate: faker.date.anytime(),
        completionDate: faker.date.anytime(),
        completionPercentage: faker.number.int(100),
        ownerId: faker.number.int({ min: 1, max: 3 }),
        teamId: 1,
      })
      await task.related('users').attach([faker.number.int({ min: 1, max: 3 })])
    }
  }
}
