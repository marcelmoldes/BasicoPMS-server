import type { HttpContext } from '@adonisjs/core/http'
import { createTaskValidator, updateTaskValidator } from '#validators/task_validator'
import Task from '#models/task'
import { column } from '@adonisjs/lucid/orm'

export default class TaskController {
  async index({ request }: HttpContext) {
    const page = request.input('page')
    const limit = request.input('limit')
    return await Task.query().paginate(page, limit)
  }

  async store({ request, response }: HttpContext) {
    try {
      const userData = request.only([
        'projectId',
        'name',
        'description',
        'status',
        'priority',
        'ownerId',
        'startDate',
        'dueDate',
        'completionDate',
       'completionPercentage',
      ])
      const payload = await createTaskValidator.validate(userData)
      const task = await Task.create(payload)
      return response.status(200).json(task)
    } catch (error) {
      return error
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const task = await Task.findOrFail(params.id)
      return response.json(task)
    } catch (error) {
      return response.status(400).json({ message: `Task not found with  id  ${params.id}` })
    }
  }

  async update({ params, response, request }: HttpContext) {
    try {
      const task = await Task.findOrFail(params.id)
      const userData = request.only([
        'projectId',
        'name',
        'description',
        'status',
        'priority',
        'ownerId',
        'startDate',
        'dueDate',
        'completionDate',
        'completionPercentage',
      ])
      const payload = await updateTaskValidator.validate(userData)
      await task.save()
      await task.merge(payload).save()
      return response.json(task)
    } catch (error) {
      return error
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const task = await Task.findOrFail(params.id)
      await task.delete()
      return response.status(200).json({ message: 'Task deleted' })
    } catch (error) {
      return response.status(400).json({ message: `Task not found,cant delete` })
    }
  }
}
