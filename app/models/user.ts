import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import Task from '#models/task'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, belongsTo, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Project from '#models/project'
import Comment from '#models/comment'
import Attachment from '#models/attachment'
import Team from '#models/team'
const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare firstName: string

  @column()
  declare lastName: string

  @column()
  declare email: string

  @column()
  declare teamId: number

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare role: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  static accessTokens = DbAccessTokensProvider.forModel(User)

  @hasMany(() => Project)
  declare projects: HasMany<typeof Project>

  @hasMany(() => Comment)
  declare comments: HasMany<typeof Comment>

  @hasMany(() => Attachment)
  declare attachments: HasMany<typeof Attachment>

  @belongsTo(() => Team)
  declare team: BelongsTo<typeof Team>

  @manyToMany(() => Task, {
    // localKey: 'id',
    pivotTable: 'task_user',
    // pivotForeignKey: 'user_id',
    // relatedKey: 'id',
    // pivotRelatedForeignKey: 'task_id',
    pivotTimestamps: true,
  })
  declare tasks: ManyToMany<typeof Task>
}
