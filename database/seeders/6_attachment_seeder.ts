import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Attachment from '#models/attachment'
import { faker } from '@faker-js/faker'

export default class extends BaseSeeder {
  async run() {
    for (let i = 1; i <= 10; i++) {
      await Attachment.create({
        name: faker.system.fileType(),
        path: faker.system.filePath(),
        taskId: i,
        userId: faker.number.int({ min: 1, max: 3 }),
        teamId: 1,
      })
    }
  }
}
