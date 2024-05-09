import User from '#models/user'
import { BasePolicy } from '@adonisjs/bouncer'
import Task from '#models/task'
import Attachment from '#models/attachment'
import Comment from '#models/comment'
export default class AttachmentPolicy extends BasePolicy {
  view(user: User, attachment: Attachment) {
    return user.teamId === attachment.teamId
  }
  createForTask(user: User, attachment: Attachment, task: Task) {
    return user.teamId === attachment.teamId && user.teamId === task.teamId
  }
  createForComment(user: User, attachment: Attachment, comment: Comment) {
    return user.teamId === attachment.teamId && user.teamId === comment.teamId
  }
  delete(user: User, attachment: Attachment) {
    return user.id === attachment.userId
  }
}
