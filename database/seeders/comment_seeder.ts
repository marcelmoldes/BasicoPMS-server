import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Comment from '#models/comment'
import { faker } from '@faker-js/faker'

export default class extends BaseSeeder {
  async run() {
    for (let i = 0; i < 100; i++) {
      await Comment.create({
        content: faker.commerce.productDescription(),
        userId: faker.number.int(100),
      })
    }
  }
}
