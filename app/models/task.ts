import { DateTime } from 'luxon'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import User from '#models/user'
import { BaseModel, column, belongsTo, manyToMany } from '@adonisjs/lucid/orm'
import Project from '#models/project'
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

  @belongsTo(() => Project)
  declare project: BelongsTo<typeof Project>

  @manyToMany(() => User)
  declare skills: ManyToMany<typeof User>
}
