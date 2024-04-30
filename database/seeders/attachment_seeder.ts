import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Attachment from '#models/attachment'
import { faker } from '@faker-js/faker'

export default class extends BaseSeeder {
  async run() {
    for (let i = 0; i < 100; i++) {
      await Attachment.create({
        name: faker.system.fileType(),
        path: faker.system.filePath(),
        commentId: faker.number.int(100),
        taskId: faker.number.int(100),
      })
    }
  }
}
