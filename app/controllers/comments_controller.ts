import type { HttpContext } from '@adonisjs/core/http'
import { createCommentValidator, updateCommentValidator } from '#validators/comment_validator'
import Comment from '#models/comment'

export default class CommentController {
  async index({ request }: HttpContext) {
    const page = request.input('page')
    const limit = request.input('limit')
    return await Comment.query().paginate(page, limit)
  }

  async store({ request, response }: HttpContext) {
    try {
      const commentData = request.only(['content', 'userId', 'taskId'])
      const payload = await createCommentValidator.validate(commentData)
      const comment = await Comment.create(payload)
      return response.status(200).json(comment)
    } catch (error) {
      return error
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const comment = await Comment.findOrFail(params.id)
      return response.json(comment)
    } catch (error) {
      return response.status(400).json({ message: `Comment not found with  id  ${params.id}` })
    }
  }

  async update({ params, response, request }: HttpContext) {
    try {
      const comment = await Comment.findOrFail(params.id)
      const commentData = request.only(['content', 'userId', 'taskId'])
      const payload = await updateCommentValidator.validate(commentData)
      await comment.save()
      await comment.merge(payload).save()
      return response.json(comment)
    } catch (error) {
      return error
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const comment = await Comment.findOrFail(params.id)
      await comment.delete()
      return response.status(200).json({ message: 'Comment deleted' })
    } catch (error) {
      return response.status(400).json({ message: `Comment not found,cant delete` })
    }
  }
}
