import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'
import { registerValidator } from '#validators/auth_validator'
import Team from '#models/team'
import sgMail from '@sendgrid/mail'
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export default class AuthController {
  async register({ request, response }: HttpContext) {
    const formData = request.only(['first_name', 'team_name', 'last_name', 'email'])
    const payload = await registerValidator.validate(formData)
    try {
      const team = await Team.create({
        name: payload['team_name'],
      })
      const password = Math.random().toString(36).substring(2, 18)
      const user = await User.create({
        firstName: payload['first_name'],
        lastName: payload['last_name'],
        email: payload['email'],
        role: 'admin',
        teamId: team.id,
        password: password,
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

  async login({ request, response }: HttpContext) {
    try {
      const { email, password } = request.only(['email', 'password'])
      const user = await User.findBy('email', email)
      if (!user) {
        return response.unprocessableEntity({
          error: 'Unable to process your request at the moment',
        })
      }
      const verified = await hash.verify(user.password, password)
      if (!verified) {
        return response.unprocessableEntity({
          error: 'Invalid password',
        })
      }
      const token = await User.accessTokens.create(user)
      return {
        type: 'bearer',
        value: token.value!.release(),
        user,
      }
    } catch (error) {
      console.error(error)
      if (error.response) {
        console.error(error.response.body)
      }
      return response.badRequest({ message: 'Unable to process your request at the moment' })
    }
  }

  async forgotPassword({ request, response }: HttpContext) {
    const { email } = request.only(['email'])

    try {
      const newPassword = Math.random().toString(36).substring(2, 18)
      const user = await User.findByOrFail('email', email)
      user.password = newPassword

      await user.save()
      await user.merge(user).save()
      const data = {
        to: user.email,
        from: 'moldesmarcel41@gmail.com',
        subject: 'Forgot Password',
        templateId: 'd-f698d27f8c5f4bc7bf1b4b5c95cc1733',
        personalizations: [
          {
            to: [{ email: user.email }],
            dynamic_template_data: {
              FirstName: user.firstName,
              Password: newPassword,
            },
          },
        ],
      }

      const result = await sgMail.send(data)

      return response.ok({
        message: 'Please check your email',
      })
    } catch (error) {
      console.error(error)
      if (error.response) {
        console.error(error.response.body)
      }
      return response.badRequest({ message: 'Unable to process your request at the moment' })
    }
  }
}
