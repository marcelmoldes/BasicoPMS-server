import type { HttpContext } from '@adonisjs/core/http'
import Attachment from '#models/attachment'
import { createAttachmentValidator, updateAttachmentValidator } from '#validators/attachment'

export default class AttachmentController {
  async index({ request }: HttpContext) {
    const page = request.input('page')
    const limit = request.input('limit')
    return await Attachment.query().paginate(page, limit)
  }

  async store({ request, response }: HttpContext) {
    try {
      const attachmentData = request.only(['name', 'attachmentId', 'path', 'commentId', 'userId'])
      const payload = await createAttachmentValidator.validate(attachmentData)
      const attachment = await Attachment.create(payload)
      return response.status(200).json(attachment)
    } catch (error) {
      return error
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const attachment = await Attachment.findOrFail(params.id)
      return response.json(attachment)
    } catch (error) {
      return response.status(400).json({ message: `Attachment not found with  id  ${params.id}` })
    }
  }

  async update({ params, response, request }: HttpContext) {
    try {
      const attachment = await Attachment.findOrFail(params.id)
      const attachmentData = request.only(['name', 'attachmentId', 'path', 'commentId', 'userId'])
      const payload = await updateAttachmentValidator.validate(attachmentData)
      await attachment.save()
      await attachment.merge(payload).save()
      return response.json(attachment)
    } catch (error) {
      return error
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const attachment = await Attachment.findOrFail(params.id)
      await attachment.delete()
      return response.status(200).json({ message: 'Attachment deleted' })
    } catch (error) {
      return response.status(400).json({ message: `Attachment not found,cant delete` })
    }
  }
}
