/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const UsersController = () => import('#controllers/users_controller')
const TasksController = () => import('#controllers/tasks_controller')

router.resource('tasks', TasksController)
router.resource('users', UsersController)
