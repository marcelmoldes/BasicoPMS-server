import type { HttpContext } from '@adonisjs/core/http'
import User from "#models/user";

export default class UsersController {
  /**
   * Return a list of users
   */
  async index({}: HttpContext) {
    return await User.all()
  }

  /**
   * Create a user
   */
  async store({ request }: HttpContext) {}

  /**
   * Show a user
   */
  async show({ params }: HttpContext) {}

  /**
   * Update a user
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete a user
   */
  async destroy({ params }: HttpContext) {}
}
