import type { HttpContext } from '@adonisjs/core/http'
import Task from '#models/task'
import TaskPolicy from '#policies/task_policy'
import { taskValidator } from '#validators/task_validator'
import Project from '#models/project'
import {
  completionPercentageOptions,
  taskPriorityOptions,
  taskStatusOptions,
} from '#config/resources/tasks.config'

export default class TaskController {
  async index({ request, auth }: HttpContext) {
    if (!auth.user) return
    const projectId = request.input('projectId')
    const teamId = auth.user?.teamId
    const currentPage = request.input('currentPage')
    const perPage = request.input('perPage')
    const searchString = request.input('searchString')
    const sortBy = request.input('sortBy', 'createdAt')
    const sortOrder = request.input('sortOrder', 'asc')
    const query = Task.query().where('team_id', teamId)
    if (searchString) {
      query.where('name', 'LIKE', `%${searchString}%`)
    }
    if (projectId) {
      query.where('project_id', projectId)
    }
    return await query.orderBy(sortBy, sortOrder).paginate(currentPage, perPage)
  }

  async store({ bouncer, request, response, auth }: HttpContext) {
    if (!auth.user) return
    try {
      const taskData = request.only([
        'projectId',
        'name',
        'description',
        'status',
        'priority',
        'startDate',
        'dueDate',
        'completionDate',
        'completionPercentage',
      ])
      const payload = await taskValidator.validate(taskData)
      const task = new Task().merge({
        teamId: auth.user.teamId,
        ownerId: auth.user.id,
        ...payload,
      })
      const project = await Project.findOrFail(payload.projectId)
      if (await bouncer.with(TaskPolicy).denies('create', task, project)) {
        return response.forbidden('Cannot create task')
      }
      await task.save()
      return response.status(200).json(task)
    } catch (error) {
      throw error
    }
  }

  async show({ bouncer, params, response, auth }: HttpContext) {
    if (!auth.user) return
    try {
      const task = await Task.findOrFail(params.id)
      if (await bouncer.with(TaskPolicy).denies('view', task)) {
        return response.forbidden('Cannot view task')
      }
      return response.json(task)
    } catch (error) {
      return response.status(400).json({ message: `Task not found with  id  ${params.id}` })
    }
  }

  async update({ bouncer, params, response, request, auth }: HttpContext) {
    if (!auth.user) return
    try {
      const task = await Task.findOrFail(params.id)
      const taskData = request.only([
        'projectId',
        'name',
        'description',
        'status',
        'priority',
        'startDate',
        'dueDate',
        'completionDate',
        'completionPercentage',
      ])
      const payload = await taskValidator.validate(taskData)
      if (await bouncer.with(TaskPolicy).denies('edit', task)) {
        return response.forbidden('Cannot edit task')
      }
      await task.merge(payload).save()
      return response.json(task)
    } catch (error) {
      throw error
    }
  }

  async destroy({ bouncer, params, response, auth }: HttpContext) {
    if (!auth.user) return
    try {
      const task = await Task.findOrFail(params.id)
      if (await bouncer.with(TaskPolicy).denies('delete', task)) {
        return response.forbidden('Cannot delete task')
      }
      await task.delete()
      return response.status(200).json({ message: 'Task deleted' })
    } catch (error) {
      return response.status(400).json({ message: `Task not found,cant delete` })
    }
  }

  async calendar({ request, auth }: HttpContext) {
    if (!auth.user) return
    const projectId = request.input('projectId')
    const teamId = auth.user?.teamId
    const query = Task.query().where('team_id', teamId)
    if (projectId) {
      query.where('project_id', projectId)
    }
    const tasks = await Task.query()
    const taskObjects = tasks.map((task) => ({
      id: task.id,
      title: task.name,
      start: task.dueDate,
      end: task.dueDate,
    }))
    return taskObjects
  }
  async config({ request, auth }: HttpContext) {
    if (!auth.user) return
    // Completion Percentage Options
    const completionOptions = []
    const completionKeys = Object.keys(completionPercentageOptions)
    for (const key of completionKeys) {
      completionOptions.push({
        value: key,
        label: completionPercentageOptions[key],
      })
    }
    // Status Options
    const statusOptions = []
    const taskKeys = Object.keys(taskStatusOptions)
    for (const key of taskKeys) {
      statusOptions.push({
        value: key,
        label: taskStatusOptions[key],
      })
    }

    // Priority Options
    const priorityOptions = []
    const priorityKeys = Object.keys(taskPriorityOptions)
    for (const key of priorityKeys) {
      priorityOptions.push({
        value: key,
        label: taskPriorityOptions[key],
      })
    }

    // Project Options
    const teamId = auth.user?.teamId
    const projectOptions = []
    const projects = await Project.query().where('team_id', teamId)
    for (const project of projects) {
      projectOptions.push({
        value: project.id,
        label: project.name,
      })
    }

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(null)
      }, 1000)
    })

    const response = {
      statusOptions,
      priorityOptions,
      projectOptions,
      completionOptions,
    }
    return response
  }
}
