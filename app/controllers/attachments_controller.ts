import type { HttpContext } from '@adonisjs/core/http'
import Attachment from '#models/attachment'
import { createAttachmentValidator } from '#validators/attachment_validator'
import AttachmentPolicy from '#policies/project_policy'

export default class AttachmentController {
  async store({ bouncer, request, response }: HttpContext) {
    try {
      const attachmentData = request.only(['name', 'path', 'commentId', 'taskId'])
      const payload = await createAttachmentValidator.validate(attachmentData)
      if (await bouncer.with(AttachmentPolicy).denies('canEdit', payload)) {
        return response.forbidden('Cannot create attachment')
      }
      const attachment = await Attachment.create(payload)
      return response.status(200).json(attachment)
    } catch (error) {
      return error
    }
  }

  async show({ bouncer, params, response }: HttpContext) {
    try {
      const attachment = await Attachment.findOrFail(params.id)
      if (await bouncer.with(AttachmentPolicy).denies('canEdit', attachment)) {
        return response.forbidden('Cannot display attachment')
      }
      return response.json(attachment)
    } catch (error) {
      return response.status(400).json({ message: `Attachment not found with  id  ${params.id}` })
    }
  }

  async destroy({ bouncer, params, response }: HttpContext) {
    try {
      const attachment = await Attachment.findOrFail(params.id)
      if (await bouncer.with(AttachmentPolicy).denies('canEdit', attachment)) {
        return response.forbidden('Cannot delete attachment')
      }
      await attachment.delete()
      return response.status(200).json({ message: 'Attachment deleted' })
    } catch (error) {
      return response.status(400).json({ message: `Attachment not found,cant delete` })
    }
  }
}
