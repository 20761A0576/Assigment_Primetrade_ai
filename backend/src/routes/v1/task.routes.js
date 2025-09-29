const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth.middleware');
const role = require('../../middlewares/role.middleware');
const { createTask, listTasks, updateTask, deleteTask } = require('../../controllers/task.controller');

/**
 * /tasks - protected endpoints
 */
router.use(auth);
router.post('/', createTask);
router.get('/', listTasks);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
