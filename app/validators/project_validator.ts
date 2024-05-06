import vine from '@vinejs/vine'

export const projectValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3).maxLength(35),
    description: vine.string().trim().minLength(3).maxLength(400),
    startDate: vine.date(),
    endDate: vine.date(),
    status: vine.string().trim().minLength(3).maxLength(30),
  })
)
