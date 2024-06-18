import vine from '@vinejs/vine'
import {
  completionPercentageOptions,
  taskPriorityOptions,
  taskStatusOptions,
} from '#config/resources/tasks.config'

export const taskValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(3).maxLength(30),
    status: vine.string().trim().in(Object.keys(taskStatusOptions)),
    priority: vine.string().trim().in(Object.keys(taskPriorityOptions)),
    description: vine.string().trim().minLength(3).maxLength(350),
    startDate: vine.date(),
    dueDate: vine.date(),
    completionDate: vine.date(),
    completionPercentage: vine.string().trim().in(Object.keys(completionPercentageOptions)),
    projectId: vine.number(),
  })
)
