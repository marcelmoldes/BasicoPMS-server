import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import { faker } from '@faker-js/faker'
export default class extends BaseSeeder {
  async run() {
    for (let i = 0; i < 3; i++) {
      await User.create({
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        teamId: 1,
        password: 'password',
      })
    }
  }
}
