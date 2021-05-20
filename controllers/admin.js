const Task = require('../models/Task');

// Read request for all tasks
exports.getIndex = async (req, res) => {
  // Task is the data we are collecting here
  const task = await Task.find((data) => data);

  try {
    // Checking if the res status is good and rendering index and
    // sending in task
    // res.status(200).render('index', { task: task });
    res.json(task);
    // Catching error
  } catch (error) {
    // logging error
    console.log(error);
  }
};

// Read request for singular task
exports.getTask = async (req, res) => {
  // taskId var is set to the taskId parameter of the request
  const taskId = req.params.taskId;
  // task is set to the the task that is retrieved using the taskId
  const task = await Task.findById(taskId, (task) => task);

  try {
    // checking if status is good and rendering task
    res.status(200).render('task', { task: task });
    // catching error
  } catch (error) {
    // logging error
    console.log(error);
  }
};

// loading the getAddTask page
exports.getAddTask = (req, res) => {
  // checking if status is 200 and rendering edit-task page
  res.status(200).render('edit-task', { editing: false });
};

exports.getEditTask = async (req, res) => {
  const taskId = req.params.taskId;
  const editMode = req.query.edit;

  if (!editMode) {
    return res.redirect('/');
  }

  const task = await Task.findById(taskId);

  try {
    if (!taskId) {
      return res.redirect('/');
    }
    res.status(200).render('edit-task', { task: task, editing: editMode });
  } catch (error) {
    console.log(error);
  }
};

// Create request
exports.postTask = (req, res) => {
  // destructuring variables and values from the request body
  const { name, dateTime, desc } = req.body;
  // setting task variable to an object made of destructured variables
  const task = new Task({ name: name, dateTime: dateTime, desc: desc });
  // adding task to db
  task.save();
  // checking if the status is 201 and redirecting to home page
  res.status(201).redirect('/');
};

// Update request
exports.postEditTask = (req, res) => {
  const taskId = req.body.taskId;
  const { name, date, description } = req.body;

  Task.findById(taskId)
    .then((task) => {
      task.name = name;
      task.date = date;
      task.description = description;

      return task.save();
    })
    .then(() => {
      res.status(201).redirect('/');
    })
    .catch((err) => {
      console.log(err);
    });
};

// Delete request
exports.postDelete = async (req, res) => {
  const taskId = req.params.taskId;
  console.log('backend ', taskId);
  const task = await Task.findByIdAndRemove(taskId, (data) => data);

  try {
    res.redirect('/');
  } catch (error) {
    console.log(error);
  }
};
