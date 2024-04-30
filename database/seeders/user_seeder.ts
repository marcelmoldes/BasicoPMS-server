import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import { faker } from '@faker-js/faker'
export default class extends BaseSeeder {
  async run() {
    for (let i = 0; i < 100; i++) {
      await User.create({
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password({ length: 10 }),
      })
    }
  }
}
