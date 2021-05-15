const Task = require('../models/Task');

exports.getIndex = (req, res) => {
  res.status(200).render('index');
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
