import type { HttpContext } from '@adonisjs/core/http'
import { createUserValidator, updateUserValidator } from '#validators/user_validator'
import User from '#models/user'
import sgMail from '@sendgrid/mail'
import hash from '@adonisjs/core/services/hash'
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
import { userRoleOptions } from '#config/resources/users.config'
import {
  completionPercentageOptions,
  taskPriorityOptions,
  taskStatusOptions,
} from '#config/resources/tasks.config'
import Project from '#models/project'
import Team from '#models/team'

export default class UsersController {
  async index({ request, auth }: HttpContext) {
    if (!auth.user) return
    const teamId = auth.user.teamId
    const page = request.input('page')
    const perPage = request.input('perPage')
    return await User.query().where('team_id', teamId).paginate(page, perPage)
  }

  async store({ request, params, response, auth }: HttpContext) {
    const teamId = auth.user?.teamId
    const userData = request.only(['firstName', 'lastName', 'email', 'role'])

    const payload = await createUserValidator.validate(userData)
    const password = Math.random().toString(36).substring(2, 18)
    try {
      const existingUser = await User.query()
        .where('email', payload.email)
        .where('teamId', teamId)
        .first()

      if (existingUser) {
        return response.status(409).json({ message: 'User already exists with this email' })
      }
      const user = await User.create({
        teamId,
        ...payload,
        password,
      })
      const data = {
        to: user.email,
        from: 'moldesmarcel41@gmail.com',
        subject: 'Welcome to BasicoPMS',
        templateId: 'd-60ad5a0eb2ff4dd6a4ae2e24af996d82',
        personalizations: [
          {
            to: [{ email: user.email }],
            dynamic_template_data: {
              FirstName: user.firstName,
              Password: password,
            },
          },
        ],
      }
      try {
        const result = await sgMail.send(data)
      } catch (error) {
        console.error(error)

        if (error.response) {
          console.error(error.response.body)
        }
      }
      return response.status(200).json(user, data)
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
      const userData = request.only(['firstName', 'lastName', 'email', 'password'])
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

  async changePassword({ request, response, auth }: HttpContext) {
    try {
      const user = await User.findByOrFail({
        id: auth.user?.id,
      })
      const { currentPassword, newPassword } = request.only(['currentPassword', 'newPassword'])

      if (!(await hash.verify(user.password, currentPassword))) {
        return response.badRequest({ message: 'Current password is incorrect' })
      }

      user.password = newPassword
      await user.save()

      return response.ok({ message: 'Password updated successfully.' })
    } catch (error) {
      console.log(error)
      return response.status(400).json({ message: `Can not change password` })
    }
  }
  async config({ request, auth }: HttpContext) {
    if (!auth.user) return

    // Status Options
    const roleOptions = []
    const userKeys = Object.keys(userRoleOptions)
    for (const key of userKeys) {
      roleOptions.push({
        value: key,
        label: userRoleOptions[key],
      })
    }

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(null)
      }, 1000)
    })

    const response = {
      roleOptions,
    }
    return response
  }
}
