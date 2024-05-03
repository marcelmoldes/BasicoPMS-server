import vine from '@vinejs/vine'

export const createAttachmentValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3).maxLength(30),
    path: vine.string().trim().minLength(3).maxLength(300),
    userId: vine.number(),
    attachmentId: vine.number(),
    commentId: vine.number(),
  })
)

export const updateAttachmentValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3).maxLength(30),
    path: vine.string().trim().minLength(3).maxLength(300),
    userId: vine.number(),
    attachmentId: vine.number(),
    commentId: vine.number(),
  })
)
