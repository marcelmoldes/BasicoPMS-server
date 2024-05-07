import { DateTime } from 'luxon'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import User from '#models/user'
import { BaseModel, column, belongsTo, manyToMany, hasMany } from '@adonisjs/lucid/orm'
import Project from '#models/project'
import Attachment from '#models/attachment'
import Comment from '#models/comment'
import Team from '#models/team'

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
  declare teamId: number

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

  @belongsTo(() => User)
  declare owner: BelongsTo<typeof User>

  @manyToMany(() => User, {
    // localKey: 'id',
    pivotTable: 'task_user',
    // pivotForeignKey: 'task_id',
    // relatedKey: 'id',
    // pivotRelatedForeignKey: 'user_id',
    pivotTimestamps: true,
  })
  declare users: ManyToMany<typeof User>

  @belongsTo(() => Team)
  declare team: BelongsTo<typeof Team>

  @hasMany(() => Attachment)
  declare attachments: HasMany<typeof Attachment>

  @hasMany(() => Comment)
  declare comments: HasMany<typeof Comment>
}
