import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import User from '#models/user'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Task from '#models/task'
import Comment from '#models/comment'
import Team from '#models/team'

export default class Attachment extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare teamId: number

  @column()
  declare path: string

  @column()
  declare userId: number

  @column()
  declare commentId: number | null

  @column()
  declare taskId: number | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Comment)
  declare comment: BelongsTo<typeof Comment>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Task)
  declare task: BelongsTo<typeof Task>

  @belongsTo(() => Team)
  declare team: BelongsTo<typeof Team>
}
