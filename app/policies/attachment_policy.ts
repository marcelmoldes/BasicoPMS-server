import User from '#models/user'
import { BasePolicy } from '@adonisjs/bouncer'
import Task from '#models/task'
import Attachment from '#models/attachment'
export default class AttachmentPolicy extends BasePolicy {
  view(user: User, attachment: Attachment) {
    return user.teamId === attachment.teamId
  }
  create(user: User, attachment: Attachment, task: Task) {
    return user.teamId === attachment.teamId && user.teamId === task.teamId
  }
  edit(user: User, attachment: Attachment) {
    return user.id === attachment.userId
  }
  delete(user: User, attachment: Attachment) {
    return user.id === attachment.userId
  }
}
