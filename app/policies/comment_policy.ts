import User from '#models/user'
import { BasePolicy } from '@adonisjs/bouncer'
import Task from '#models/task'
import Comment from '#models/comment'
export default class CommentPolicy extends BasePolicy {
  view(user: User, comment: Comment) {
    return user.teamId === comment.teamId
  }
  create(user: User, comment: Comment, task: Task) {
    return user.teamId === comment.teamId && user.teamId === task.teamId
  }
  edit(user: User, comment: Comment) {
    return user.teamId === comment.teamId
  }
  delete(user: User, comment: Comment) {
    return user.teamId === comment.teamId
  }
}
