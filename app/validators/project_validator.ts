import vine from '@vinejs/vine'

export const createProjectValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3).maxLength(35),
    description: vine.string().trim().minLength(3).maxLength(400),
    startDate: vine.date(),
    endDate: vine.date(),
    status: vine.string().trim().minLength(3).maxLength(30),
    ownerId: vine.number(),
    teamId: vine.number(),
  })
)

export const updateProjectValidator = vine.compile(
  vine.object({
    endDate: vine.date(),
    name: vine.string().trim().minLength(3).maxLength(35),
    description: vine.string().trim().minLength(3).maxLength(400),
    startDate: vine.date(),
    status: vine.string().trim().minLength(3).maxLength(30),
    ownerId: vine.number(),
    teamId: vine.number(),
  })
)
