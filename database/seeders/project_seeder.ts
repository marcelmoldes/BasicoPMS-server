import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Project from '#models/project'
import { faker } from '@faker-js/faker'

export default class extends BaseSeeder {
  async run() {
    await Project.create({
      name: faker.company.name(),
      description: faker.commerce.productDescription(),
      status: faker.number.int({ min: 0, max: 1 }) % 2 ? 'open' : 'closed',
      startDate: faker.date.anytime(),
      endDate: faker.date.anytime(),
      ownerId: 1,
      teamId: 1,
    })
  }
}
