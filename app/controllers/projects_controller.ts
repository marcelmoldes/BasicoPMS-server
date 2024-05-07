import type { HttpContext } from '@adonisjs/core/http'
import { projectValidator } from '#validators/project_validator'
import Project from '#models/project'
import AttachmentPolicy from '#policies/project_policy'

export default class ProjectController {
  async index({ request, auth }: HttpContext) {
    if (!auth.user) return
    const teamId = auth.user?.teamId
    const page = request.input('page')
    const limit = request.input('limit')
    return await Project.query()
      .where('team_id', teamId)
      .where('deleted', false)
      .paginate(page, limit)
  }

  async store({ request, response, auth }: HttpContext) {
    if (!auth.user) return
    try {
      const projectData = request.only(['name', 'description', 'startDate', 'endDate', 'status'])
      const payload = await projectValidator.validate(projectData)
      const project = await Project.create({
        teamId: auth.user.teamId,
        ownerId: auth.user.id,
        ...payload,
      })
      return response.status(200).json(project)
    } catch (error) {
      return error
    }
  }

  async show({ bouncer, params, response, auth }: HttpContext) {
    if (!auth.user) return
    try {
      const project = await Project.findOrFail(params.id)
      if (project.deleted) {
        throw Error('Project deleted')
      }
      if (await bouncer.with(AttachmentPolicy).denies('view', project)) {
        return response.forbidden('Cannot view project')
      }
      return response.json(project)
    } catch (error) {
      return response.status(400).json({ message: `Project not found with  id  ${params.id}` })
    }
  }

  async update({ bouncer, params, response, request, auth }: HttpContext) {
    if (!auth.user) return
    try {
      const project = await Project.findOrFail(params.id)
      if (project.deleted) {
        throw Error('Project deleted')
      }
      const projectData = request.only(['name', 'description', 'startDate', 'endDate', 'status'])
      const payload = await projectValidator.validate(projectData)
      if (await bouncer.with(AttachmentPolicy).denies('edit', project)) {
        return response.forbidden('Cannot edit project')
      }
      await project.merge(payload).save()
      return response.json(project)
    } catch (error) {
      return error
    }
  }

  async destroy({ bouncer, params, response, auth }: HttpContext) {
    if (!auth.user) return
    try {
      const project = await Project.findOrFail(params.id)
      if (await bouncer.with(AttachmentPolicy).denies('delete', project)) {
        return response.forbidden('Cannot delete project')
      }
      project.deleted = true
      await project.save()
      return response.status(200).json({ message: 'Project deleted' })
    } catch (error) {
      return response.status(400).json({ message: `Project not found,cant delete` })
    }
  }
}
