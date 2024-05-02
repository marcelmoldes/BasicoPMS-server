import vine from '@vinejs/vine'

export const createTeamValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3).maxLength(35),
  })
)

export const updateTeamValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3).maxLength(35),
  })
)
