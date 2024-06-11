import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const AuthController = () => import('#controllers/auth_controller')
const UsersController = () => import('#controllers/users_controller')
const TasksController = () => import('#controllers/tasks_controller')
const AttachmentsController = () => import('#controllers/attachments_controller')
const CommentsController = () => import('#controllers/comments_controller')
const ProjectsController = () => import('#controllers/projects_controller')
const AnalyticsController = () => import('#controllers/analytics_controller')

router.post('/login', [AuthController, 'login'])
router.post('/register', [AuthController, 'register'])
router.resource('tasks', TasksController).use(
  '*',
  middleware.auth({
    guards: ['api'],
  })
)
router.resource('users', UsersController).use(
  '*',
  middleware.auth({
    guards: ['api'],
  })
)
router.resource('projects', ProjectsController).use(
  '*',
  middleware.auth({
    guards: ['api'],
  })
)
router.resource('comments', CommentsController).use(
  '*',
  middleware.auth({
    guards: ['api'],
  })
)
router.resource('attachments', AttachmentsController).use(
  '*',
  middleware.auth({
    guards: ['api'],
  })
)
router.resource('analytics', AnalyticsController).use(
  '*',
  middleware.auth({
    guards: ['api'],
  })
)
