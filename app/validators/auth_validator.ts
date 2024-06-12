import vine from '@vinejs/vine'

export const registerValidator = vine.compile(
  vine.object({
    first_name: vine.string().trim().minLength(3).maxLength(30),
    last_name: vine.string().trim().minLength(3).maxLength(55),
    email: vine.string().trim().email().minLength(3).maxLength(40),
    team_name: vine.string().trim().minLength(3).maxLength(50),
  })
)
