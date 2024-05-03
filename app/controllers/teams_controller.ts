import type { HttpContext } from '@adonisjs/core/http'
import { createTeamValidator, updateTeamValidator } from '#validators/team_validator'
import Team from '#models/team'
export default class TeamController {
  async index({ request }: HttpContext) {
    const page = request.input('page')
    const limit = request.input('limit')
    return await Team.query().paginate(page, limit)
  }

  async store({ request, response }: HttpContext) {
    try {
      const teamData = request.only(['name'])
      const payload = await createTeamValidator.validate(teamData)
      const team = await Team.create(payload)
      return response.status(200).json(team)
    } catch (error) {
      return error
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const team = await Team.findOrFail(params.id)
      return response.json(team)
    } catch (error) {
      return response.status(400).json({ message: `Team not found with  id  ${params.id}` })
    }
  }

  async update({ params, response, request }: HttpContext) {
    try {
      const team = await Team.findOrFail(params.id)
      const teamData = request.only(['name'])
      const payload = await updateTeamValidator.validate(teamData)
      await team.save()
      await team.merge(payload).save()
      return response.json(team)
    } catch (error) {
      return error
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const team = await Team.findOrFail(params.id)
      await team.delete()
      return response.status(200).json({ message: 'Team deleted' })
    } catch (error) {
      return response.status(400).json({ message: `Team not found,cant delete` })
    }
  }
}
