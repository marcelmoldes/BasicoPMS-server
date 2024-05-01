import type { HttpContext } from '@adonisjs/core/http'

export default class TasksController {
  /**
   * Return a list of tasks
   */
  async index({}: HttpContext) {}

  /**
   * Create a task
   */
  async store({ request }: HttpContext) {}

  /**
   * Show a task
   */
  async show({ params }: HttpContext) {}

  /**
   * Update a task
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete a task
   */
  async destroy({ params }: HttpContext) {}
}
