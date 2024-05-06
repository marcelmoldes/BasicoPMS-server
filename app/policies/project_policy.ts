import User from '#models/user'
import { BasePolicy } from '@adonisjs/bouncer'
import Project from '#models/project'

export default class ProjectPolicy extends BasePolicy {
  view(user: User, project: Project) {
    return user.teamId === project.teamId
  }
  edit(user: User, project: Project) {
    return user.teamId === project.teamId
  }
  delete(user: User, project: Project) {
    return user.teamId === project.teamId
  }
}
