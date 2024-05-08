import type { HttpContext } from '@adonisjs/core/http'
import CommentPolicy from '#policies/comment_policy'
import Comment from '#models/comment'
import { commentValidator } from '#validators/comment_validator'
import Task from '#models/task'

export default class CommentsController {
  async index({ request, auth }: HttpContext) {
    if (!auth.user) return
    const teamId = auth.user?.teamId
    const page = request.input('page')
    const limit = request.input('limit')
    const taskId = request.input('taskId')
    if (taskId) {
      return await Comment.query()
        .where('team_id', teamId)
        .andWhere('task_id', taskId)
        .paginate(page, limit)
    } else {
      return await Comment.query().where('team_id', teamId).paginate(page, limit)
    }
  }

  async store({ bouncer, request, response, auth }: HttpContext) {
    if (!auth.user) return
    try {
      const commentData = request.only(['content', 'taskId'])
      const payload = await commentValidator.validate(commentData)
      const comment = new Comment().merge({
        teamId: auth.user.teamId,
        userId: auth.user.id,
        ...payload,
      })
      const task = await Task.findOrFail(payload.taskId)
      if (await bouncer.with(CommentPolicy).denies('create', comment, task)) {
        return response.forbidden('Cannot create comment')
      }
      await comment.save()
      return response.status(200).json(comment)
    } catch (error) {
      return error
    }
  }
}
/*
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
        return error
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
  }
  */
