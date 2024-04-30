import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Task extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare projectId: number

  @column()
  declare name: string

  @column()
  declare description: string

  @column()
  declare status: string

  @column()
  declare priority: string

  @column()
  declare ownerId: number

  @column()
  declare startDate: Date

  @column()
  declare dueDate: Date

  @column()
  declare completionDate: Date

  @column()
  declare completionPercentage: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
