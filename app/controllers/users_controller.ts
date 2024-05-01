import type { HttpContext } from '@adonisjs/core/http'

import User from '#models/user'

export default class UsersController {
  /**
   * Return a list of users
   */
  async index({ request }: HttpContext) {
    const page = request.input('page')
    const limit = request.input('limit')
    return await User.query().paginate(page, limit)
  }

  /**
   * Create a user
   */
  async store({ request, response }: HttpContext) {
    const userData = request.only(['first_name', 'team_id', 'last_name', 'email', 'password'])
    try {
      const user = await User.create(userData)
      return response.status(200).json(user)
    } catch (error) {
      return error
    }
  }

  /**
   * Show a user
   */
  async show({ params, response }: HttpContext) {
    try {
      const user = await User.findOrFail(params.id)
      return response.json(user)
    } catch (error) {
      return response.status(400).json({ message: `User not found with  id  ${params.id}` })
    }
  }

  /**
   * Update a user
   */
  async update({ params, response, request }: HttpContext) {
    try {
      const user = await User.findOrFail(params.id)
      const userData = request.only(['first_name', 'team_id', 'last_name', 'email', 'password'])
      await user.save()
      await user.merge(userData).save()
      return response.json(user)
    } catch (error) {
      return response.status(400).json({ message: `Error updating user` })
    }
  }

  /**
   * Delete a user
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const user = await User.findOrFail(params.id)
      await user.delete()
      return response.status(200).json({ message: 'User deleted' })
    } catch (error) {
      return response.status(400).json({ message: `User not found,cant delete` })
    }
  }
}
