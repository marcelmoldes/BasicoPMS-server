import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Project from '#models/project'
import { faker } from '@faker-js/faker'

export default class extends BaseSeeder {
  async run() {
    for (let i = 0; i < 100; i++) {
      await Project.create({
        name: faker.company.name(),
        description: faker.commerce.productDescription(),
        status: faker.company.buzzVerb(),
        startDate: faker.date.anytime(),
        endDate: faker.date.anytime(),
        ownerId: faker.number.int(100),
      })
    }
  }
}
