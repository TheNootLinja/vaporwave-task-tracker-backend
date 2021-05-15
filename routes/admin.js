const express = require('express');
const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/', adminController.getIndex);

router.get('/add-task', adminController.getAddTask);

router.post('/add-task', adminController.postTask);

router.get('/:taskId', adminController.getTask);

module.exports = router;
