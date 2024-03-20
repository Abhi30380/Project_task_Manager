const Task = require('../models/Task')  //importing Task from mongoose
const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')


const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({})  // using the find method of the Task in model. It retrieves all tasks from the MongoDB collection.
  res.status(200).json({ tasks })  //Once the database query is complete, the route handler responds with a JSON object containing the retrieved tasks. The HTTP status code is set to 200 (OK).
})

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body)  //mongo mein new task and data of that task is provided in req.body
  res.status(201).json({ task })   // This would respond to the client with a status code of 201 (Created) and a JSON object containing the details of the newly created task.
})


//In Express.js, req.params is an object that contains route parameters.
const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params  ////This part of the code is using object destructuring syntax to create a new object with a property named id and assign the value of req.params.id to a variable named taskID
  const task = await Task.findOne({ _id: taskID })
  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404))
  }

  res.status(200).json({ task }) //sets http status code 200-indicating successful request and  sends a JSON response to the client.
})

const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params  //to create a new object with a property named id and assign the value of req.params.id to a variable named taskID
  const task = await Task.findOneAndDelete({ _id: taskID })  //task id ko find krke delete krdo
  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404))
  }
  res.status(200).json({ task }) //sets http status code 200 and sends a json response
})


const updateTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params

  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {  //update krna h taskid ko req.body ke content se
    new: true,  // returns the modified document rather than the original document
  })

  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404))
  }

  res.status(200).json({ task })
})


//exporting functions
module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
}
