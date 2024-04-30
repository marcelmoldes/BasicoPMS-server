import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Task from '#models/task'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import User from '#models/user'

export default class Team extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare description: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Task)
  declare tasks: HasMany<typeof Task>

  @hasMany(() => User)
  declare users: HasMany<typeof User>
}
