import vine from '@vinejs/vine'

export const createCommentValidator = vine.compile(
  vine.object({
    content: vine.string().trim().minLength(3).maxLength(300),
    taskId: vine.number(),
  })
)

export const updateCommentValidator = vine.compile(
  vine.object({
    content: vine.string().trim().minLength(3).maxLength(300),
  })
)
