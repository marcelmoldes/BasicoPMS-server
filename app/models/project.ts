import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Task from '#models/task'
import User from '#models/user'
import Team from '#models/team'
export default class Project extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare description: string

  @column()
  declare startDate: Date

  @column()
  declare endDate: Date

  @column()
  declare status: string

  @column()
  declare ownerId: number

  @column()
  declare teamId: number

  @column()
  declare deleted: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Task)
  declare tasks: HasMany<typeof Task>

  @belongsTo(() => Team)
  declare team: BelongsTo<typeof Team>

  @belongsTo(() => User)
  declare owner: BelongsTo<typeof User>
}
