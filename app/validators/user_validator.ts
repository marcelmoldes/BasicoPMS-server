import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    first_name: vine.string().trim().minLength(3).maxLength(30),
    last_name: vine.string().trim().minLength(3).maxLength(55),
    email: vine.string().trim().email().minLength(3).maxLength(40),
    password: vine.string().trim().minLength(3).maxLength(12),
    team_id: vine.number(),
  })
)

export const updateUserValidator = vine.compile(
  vine.object({
    firstName: vine.string().trim().minLength(3).maxLength(30),
    lastName: vine.string().trim().minLength(3).maxLength(55),
    email: vine.string().trim().minLength(3).maxLength(40),
    password: vine.string().trim().minLength(3).maxLength(12),
    teamId: vine.number(),
  })
)
