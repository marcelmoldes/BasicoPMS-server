import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class AnalyticsController {
  async index({ auth }: HttpContext) {
    if (!auth.user) return
    {
      const openTasks = await db
        .from('tasks')
        .whereIn('status', ['open', 'in_progress'])
        .count('* as open')
      const closedTasks = await db.from('tasks').where('status', 'completed').count('* as closed')
      const openProjects = await db.from('projects').where('status', 'open').count('* as open')
      const closedProjects = await db
        .from('projects')
        .whereIn('status', ['open', 'in_progress'])
        .count('* as closed')
      return {
        openTasks: openTasks[0].open,
        closedTasks: closedTasks[0].closed,
        openProjects: openProjects[0].open,
        closedProjects: closedProjects[0].closed,
      }
    }
  }
}
