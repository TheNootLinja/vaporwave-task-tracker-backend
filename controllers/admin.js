const Task = require('../models/Task');

// exports.getIndex = (req, res) => {
//   res.status(200).render('index');
// };

exports.getIndex = async (req, res) => {
  const task = await Task.find((data) => data);

  try {
    console.log(task);
    res.status(200).render('index', { task: task });
  } catch (error) {
    console.log(error);
  }
};

exports.getTask = async (req, res) => {
  const taskId = req.params.taskId;
  const task = await Task.findById(taskId, (task) => task);

  try {
    console.log(task);
    res.status(200).render('task', { task: task });
  } catch (error) {
    console.log(error);
  }
};

exports.getAddTask = (req, res) => {
  res.status(200).render('edit-task');
};

exports.postTask = (req, res) => {
  const { name, date, description } = req.body;

  const task = new Task({ name: name, date: date, description: description });
  task.save();
  console.log('Task added to database');
  res.status(201).redirect('/');
};
