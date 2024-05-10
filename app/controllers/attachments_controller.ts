import type { HttpContext } from '@adonisjs/core/http'
import Attachment from '#models/attachment'
import { createAttachmentValidator } from '#validators/attachment_validator'
import AttachmentPolicy from '#policies/attachment_policy'
import Task from '#models/task'
import Comment from '#models/comment'

export default class AttachmentsController {
  async index({ request, auth }: HttpContext) {
    if (!auth.user) return
    const teamId = auth.user?.teamId
    const page = request.input('page')
    const limit = request.input('limit')
    const taskId = request.input('taskId')
    const commentId = request.input('commentId')
    if (taskId) {
      return await Attachment.query()
        .where('team_id', teamId)
        .andWhere('task_id', taskId)
        .paginate(page, limit)
    } else if (commentId) {
      return await Attachment.query()
        .where('team_id', teamId)
        .andWhere('comment_id', commentId)
        .paginate(page, limit)
    } else {
      return await Attachment.query().where('team_id', teamId).paginate(page, limit)
    }
  }

  async store({ bouncer, request, response, auth }: HttpContext) {
    if (!auth.user) return
    try {
      const attachmentData = request.only(['name', 'path', 'taskId', 'commentId'])
      const payload = await createAttachmentValidator.validate(attachmentData)
      const attachment = new Attachment().merge({
        teamId: auth.user.teamId,
        userId: auth.user.id,
        ...payload,
      })
      if (attachment.taskId) {
        attachment.commentId = null
        const task = await Task.findOrFail(payload.taskId)
        if (await bouncer.with(AttachmentPolicy).denies('createForTask', attachment, task)) {
          return response.forbidden('Cannot create Attachment')
        }
      } else {
        const comment = await Comment.findOrFail(payload.commentId)
        if (await bouncer.with(AttachmentPolicy).denies('createForComment', attachment, comment)) {
          return response.forbidden('Cannot create Attachment')
        }
      }
      await attachment.save()
      return response.status(200).json(attachment)
    } catch (error) {
      throw error
    }
  }

  async show({ bouncer, params, response, auth }: HttpContext) {
    if (!auth.user) return
    try {
      const attachment = await Attachment.findOrFail(params.id)
      if (await bouncer.with(AttachmentPolicy).denies('view', attachment)) {
        return response.forbidden('Cannot view attachment')
      }
      return response.json(attachment)
    } catch (error) {
      return response.status(400).json({ message: `Attachment not found with  id  ${params.id}` })
    }
  }

  async destroy({ bouncer, params, response, auth }: HttpContext) {
    if (!auth.user) return
    try {
      const attachment = await Attachment.findOrFail(params.id)
      if (await bouncer.with(AttachmentPolicy).denies('delete', attachment)) {
        return response.forbidden('Cannot delete attachment')
      }
      await attachment.delete()
      return response.status(200).json({ message: 'Attachment deleted' })
    } catch (error) {
      return response.status(400).json({ message: `Attachment not found,cant delete` })
    }
  }
}
