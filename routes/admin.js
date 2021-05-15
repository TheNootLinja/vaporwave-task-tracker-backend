const express = require('express');
const adminController = require('../controllers/admin');

const router = express.Router();
// Get route for home page
router.get('/', adminController.getIndex);
// Get route for add task page
router.get('/add-task', adminController.getAddTask);
// Post route for add task page
router.post('/add-task', adminController.postTask);
// Get route based on a query we pass in the url
router.get('/:taskId', adminController.getTask);

module.exports = router;
