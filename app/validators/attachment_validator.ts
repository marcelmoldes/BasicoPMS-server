import vine from '@vinejs/vine'

export const createAttachmentValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3).maxLength(30),
    path: vine.string().trim().minLength(3).maxLength(300),
    taskId: vine.number().optional(),
    commentId: vine.number().optional(),
  })
)
