const express = require('express');
const router = express.Router({ mergeParams: true }); //must be true to inherit req.params from project routing points

const { getTask, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const { protect } = require('../middleware.authMiddleware');

router.use(protect);

//Match endpoints
router.route('/')
.get(getTasks)
.post(createTask);

router.route('/:id')
.put(updateTask)
.delete(deleteTask);

module.exports = router;