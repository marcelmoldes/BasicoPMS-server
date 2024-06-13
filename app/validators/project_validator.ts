import vine from '@vinejs/vine'

export const projectValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3).maxLength(35),
    description: vine.string().trim().minLength(3).maxLength(400),
    startDate: vine.date().optional(),
    endDate: vine.date().optional(),
    status: vine.string().trim().in(['open', 'in_progress', 'closed']),
  })
)
