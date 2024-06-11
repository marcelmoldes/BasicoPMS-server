import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    firstName: vine.string().trim().minLength(3).maxLength(30),
    lastName: vine.string().trim().minLength(3).maxLength(55),
    email: vine.string().trim().email().minLength(3).maxLength(40),
    role: vine.string().trim().in(['admin', 'user']),
    password: vine.string().trim().minLength(3).maxLength(12).optional(),
  })
)

export const updateUserValidator = vine.compile(
  vine.object({
    firstName: vine.string().trim().minLength(3).maxLength(30),
    lastName: vine.string().trim().minLength(3).maxLength(55),
    email: vine.string().trim().email().minLength(3).maxLength(40),
    role: vine.string().trim().in(['admin', 'user']),
    password: vine.string().trim().minLength(3).maxLength(12).optional(),
  })
)
