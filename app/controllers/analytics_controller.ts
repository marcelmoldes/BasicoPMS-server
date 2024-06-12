import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class AnalyticsController {
  async index({ auth }: HttpContext) {
    if (!auth.user) return
    {
      const openTasks = await db
        .from('tasks')
        .where('team_id', auth.user.teamId)
        .whereIn('status', ['open', 'in_progress'])
        .count('* as open')
      const closedTasks = await db
        .from('tasks')
        .where('team_id', auth.user.teamId)
        .where('status', 'closed')
        .count('* as closed')
      const closedProjects = await db
        .from('projects')
        .where('team_id', auth.user.teamId)
        .where('status', 'closed')
        .count('* as closed')
      const openProjects = await db
        .from('projects')
        .where('team_id', auth.user.teamId)
        .whereIn('status', ['open', 'in_progress'])
        .count('* as open')
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(null)
        }, 1000)
      })
      return {
        openTasks: openTasks[0].open,
        closedTasks: closedTasks[0].closed,
        openProjects: openProjects[0].open,
        closedProjects: closedProjects[0].closed,
      }
    }
  }
}
