import vine from '@vinejs/vine'

export const taskValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3).maxLength(30),
    status: vine.string().trim().minLength(3).maxLength(30),
    priority: vine.string().trim().minLength(3).maxLength(20),
    description: vine.string().trim().minLength(3).maxLength(350),
    startDate: vine.date(),
    dueDate: vine.date(),
    completionDate: vine.date(),
    completionPercentage: vine.number(),
    projectId: vine.number(),
  })
)
