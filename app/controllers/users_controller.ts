import type { HttpContext } from '@adonisjs/core/http'
import { createUserValidator, updateUserValidator } from '#validators/user_validator'
import User from '#models/user'

export default class UsersController {
  async index({ request, auth }: HttpContext) {
    if (!auth.user) return
    const teamId = auth.user.teamId
    const page = request.input('page')
    const perPage = request.input('perPage')
    return await User.query().where('team_id', teamId).paginate(page, perPage)
  }

  async store({ request, response, auth }: HttpContext) {
    const teamId = auth.user?.teamId
    const userData = request.only(['firstName', 'lastName', 'email', 'password', 'role'])
    userData.password = 'password'
    const payload = await createUserValidator.validate(userData)
    try {
      const user = await User.create({
        teamId,
        ...payload,
      })
      return response.status(200).json(user)
    } catch (error) {
      throw error
    }
  }

  async show({ params, response, auth }: HttpContext) {
    const teamId = auth.user?.teamId
    try {
      const user = await User.findByOrFail({
        id: params.id,
        teamId,
      })
      return response.json(user)
    } catch (error) {
      return response.status(400).json({ message: `User not found with  id  ${params.id}` })
    }
  }

  async update({ params, response, request, auth }: HttpContext) {
    const teamId = auth.user?.teamId
    try {
      const user = await User.findByOrFail({
        id: params.id,
        teamId,
      })
      const userData = request.only(['firstName', 'lastName', 'email', 'password', 'role'])
      const payload = await updateUserValidator.validate(userData)
      await user.save()
      await user.merge(payload).save()
      return response.json(user)
    } catch (error) {
      throw error
    }
  }

  async destroy({ params, response, auth }: HttpContext) {
    const teamId = auth.user?.teamId
    try {
      const user = await User.findByOrFail({
        id: params.id,
        teamId,
      })
      await user.delete()
      return response.status(200).json({ message: 'User deleted' })
    } catch (error) {
      return response.status(400).json({ message: `User not found,cant delete` })
    }
  }
}
