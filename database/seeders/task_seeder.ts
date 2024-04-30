import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Task from '#models/task'
import { faker } from '@faker-js/faker'

export default class extends BaseSeeder {
  async run() {
    for (let i = 0; i < 100; i++) {
      await Task.create({
        name: faker.company.name(),
        projectId: faker.number.int(100),
        description: faker.commerce.productDescription(),
        priority: faker.company.buzzVerb(),
        status: faker.company.buzzVerb(),
        startDate: faker.date.anytime(),
        dueDate: faker.date.anytime(),
        completionDate: faker.date.anytime(),
        completionPercentage: faker.datatype.number(100),
        ownerId: faker.number.int(100),
      })
    }
  }
}
