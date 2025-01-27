import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Team from '#models/team'
import { faker } from '@faker-js/faker'

export default class extends BaseSeeder {
  async run() {
    await Team.create({
      name: faker.company.name(),
    })
  }
}
