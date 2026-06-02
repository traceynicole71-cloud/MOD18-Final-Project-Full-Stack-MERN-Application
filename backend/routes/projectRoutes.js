
//RESTFUL aPI routing
const express = require('express');
const router = express.Router();

const {
    getProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
} = require('../controllers/projectController');

//Import authMiddleware
const { protect } = require('../middleware/authMiddleware');
//Secure route with mddielware
router.use(protect);

//Base routing path map to REST specifications
router.route('/')
.get(getProjects)
.post(createProject);

//Parameter paths
router.route('/:id')
.get(getProjectById)
.put(updateProject)
.delete(deleteProject);

//Re-route nested paths over to Task sub-router layout
router.use('/:projectId/tasks', require('./taskRoutes'));
module.export = router;