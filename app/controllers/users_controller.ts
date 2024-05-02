import type { HttpContext } from '@adonisjs/core/http'
import { createUserValidator, updateUserValidator } from '#validators/user_validator'
import User from '#models/user'

export default class UsersController {
  async index({ request }: HttpContext) {
    const page = request.input('page')
    const limit = request.input('limit')
    return await User.query().paginate(page, limit)
  }

  async store({ request, response }: HttpContext) {
    const userData = request.only(['firstName', 'teamId', 'lastName', 'email', 'password'])
    const payload = await createUserValidator.validate(userData)
    try {
      const user = await User.create(payload)
      return response.status(200).json(user)
    } catch (error) {
      return error
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const user = await User.findOrFail(params.id)
      return response.json(user)
    } catch (error) {
      return response.status(400).json({ message: `User not found with  id  ${params.id}` })
    }
  }

  async update({ params, response, request }: HttpContext) {
    try {
      const user = await User.findOrFail(params.id)
      const userData = request.only(['firstName', 'teamId', 'lastName', 'email', 'password'])
      const payload = await updateUserValidator.validate(userData)
      await user.save()
      await user.merge(payload).save()
      return response.json(user)
    } catch (error) {
      return error
    }
  }

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
