import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import User from '#models/user'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Attachment from '#models/attachment'
import Task from '#models/task'

export default class Comment extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare taskId: number

  @column()
  declare content: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Attachment)
  declare attachments: HasMany<typeof Attachment>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Task)
  declare task: BelongsTo<typeof Task>
}
