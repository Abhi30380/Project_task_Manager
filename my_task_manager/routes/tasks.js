const express = require('express')
const router = express.Router()   //creating instance of router

const {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
  editTask,
} = require('../controllers/tasks')   //import kr rhe tasks functions controllers se and variable mein daal rhe vhi naam se


//router.route method help in making chainable route handlers
//help in define multiple http methods for the same route path

router.route('/').get(getAllTasks).post(createTask)  // jab root path/ ke liye get request is made then getalltaks function invoke hoga and post se create
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask) // jab /:id path ke liye get request aayegi to getTask invoke hoga and similarily others

module.exports = router