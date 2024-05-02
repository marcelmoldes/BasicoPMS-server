import router from '@adonisjs/core/services/router'
const UsersController = () => import('#controllers/users_controller')
const TasksController = () => import('#controllers/tasks_controller')
const AttachmentsController = () => import('#controllers/attachments_controller')
const CommentsController = () => import('#controllers/comments_controller')
const TeamsController = () => import('#controllers/teams_controller')
const ProjectsController = () => import('#controllers/projects_controller')

router.resource('tasks', TasksController)
router.resource('users', UsersController)
router.resource('projects', ProjectsController)
router.resource('teams', TeamsController)
router.resource('comments', CommentsController)
router.resource('attachments', AttachmentsController)
