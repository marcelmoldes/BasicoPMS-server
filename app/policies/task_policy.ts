import User from '#models/user'
import { BasePolicy } from '@adonisjs/bouncer'
import Task from '#models/task'
import Project from '#models/project'
export default class TaskPolicy extends BasePolicy {
  view(user: User, task: Task) {
    return user.teamId === task.teamId
  }
  create(user: User, task: Task, project: Project) {
    return user.teamId === task.teamId && user.teamId === project.teamId
  }
  edit(user: User, task: Task) {
    return user.teamId === task.teamId
  }
  delete(user: User, task: Task) {
    return user.teamId === task.teamId
  }
}
