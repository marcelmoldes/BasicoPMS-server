import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Comment from '#models/comment'
import { faker } from '@faker-js/faker'

export default class extends BaseSeeder {
  async run() {
    for (let i = 0; i < 20; i++) {
      await Comment.create({
        content: faker.commerce.productDescription(),
        taskId: faker.number.int({ min: 1, max: 10 }),
        userId: faker.number.int({ min: 1, max: 3 }),
      })
    }
  }
}
