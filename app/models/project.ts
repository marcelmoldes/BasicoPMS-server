import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, belongsTo, hasOne } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany, HasOne } from '@adonisjs/lucid/types/relations'
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

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Task)
  declare tasks: HasMany<typeof Task>

  @hasOne(() => Team)
  declare team: HasOne<typeof Team>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
