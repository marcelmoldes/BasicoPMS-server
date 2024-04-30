import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Team from '#models/team'
import { faker } from '@faker-js/faker'

export default class extends BaseSeeder {
  async run() {
    for (let i = 0; i < 100; i++) {
      await Team.create({
        name: faker.company.name(),
        description: faker.commerce.productDescription(),
      })
    }
  }
}
