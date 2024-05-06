// import type { HttpContext } from '@adonisjs/core/http'

import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'
import { registerValidator } from '#validators/auth_validator'
import Team from '#models/team'

export default class AuthController {
  async register({ request, response }: HttpContext) {
    const formData = request.only(['first_name', 'team_name', 'last_name', 'email', 'password'])
    const payload = await registerValidator.validate(formData)
    try {
      const team = await Team.create({
        name: payload['team_name'],
      })
      const user = await User.create({
        firstName: payload['first_name'],
        lastName: payload['last_name'],
        email: payload['email'],
        role: 'admin',
        password: payload['password'],
        teamId: team.id,
      })
      return response.status(200).json(user)
    } catch (error) {
      return error
    }
  }

  async login({ request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    const user = await User.findBy('email', email)
    if (!user) {
      return response.abort('Invalid credentials')
    }

    await hash.verify(user.password, password)

    const token = await User.accessTokens.create(user)

    return {
      type: 'bearer',
      value: token.value!.release(),
    }
  }
}
