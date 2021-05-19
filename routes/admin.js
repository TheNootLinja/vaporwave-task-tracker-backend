const express = require('express');
const adminController = require('../controllers/admin');

const router = express.Router();
// Get route for home page
router.get('/', adminController.getIndex);
// Get route for add task page
router.get('/add-task', adminController.getAddTask);
// Get route for edit task page
router.get('/edit-task/:taskId', adminController.getEditTask);
// Post route for add task page
router.post('/add-task', adminController.postTask);
// Post route for edit task page
router.post('/edit-task', adminController.postEditTask);
// Get route based on a query we pass in the url
router.get('/:taskId', adminController.getTask);
// Post route for deleting a task
router.post('/delete/:taskId', adminController.postDelete);

module.exports = router;
