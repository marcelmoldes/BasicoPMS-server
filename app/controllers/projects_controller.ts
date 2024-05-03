import type { HttpContext } from '@adonisjs/core/http'
import { createProjectValidator, updateProjectValidator } from '#validators/project_validator'
import Project from '#models/project'

export default class ProjectController {
  async index({ request }: HttpContext) {
    const page = request.input('page')
    const limit = request.input('limit')
    return await Project.query().paginate(page, limit)
  }

  async store({ request, response }: HttpContext) {
    try {
      const projectData = request.only([
        'name',
        'teamId',
        'ownerId',
        'description',
        'startDate',
        'endDate',
        'status',
      ])
      const payload = await createProjectValidator.validate(projectData)
      const project = await Project.create(payload)
      return response.status(200).json(project)
    } catch (error) {
      return error
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const project = await Project.findOrFail(params.id)
      return response.json(project)
    } catch (error) {
      return response.status(400).json({ message: `Project not found with  id  ${params.id}` })
    }
  }

  async update({ params, response, request }: HttpContext) {
    try {
      const project = await Project.findOrFail(params.id)
      const projectData = request.only([
        'name',
        'teamId',
        'ownerId',
        'description',
        'startDate',
        'endDate',
        'status',
      ])
      const payload = await updateProjectValidator.validate(projectData)
      await project.save()
      await project.merge(payload).save()
      return response.json(project)
    } catch (error) {
      return error
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const project = await Project.findOrFail(params.id)
      await project.delete()
      return response.status(200).json({ message: 'Project deleted' })
    } catch (error) {
      return response.status(400).json({ message: `Project not found,cant delete` })
    }
  }
}
