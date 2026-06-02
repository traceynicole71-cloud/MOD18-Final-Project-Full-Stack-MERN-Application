const Task = require('../models/Task');
const Project = require('../models/Project');

//GET get all tasks for project
const getTasks = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.projectId);

        if (!project) {
            res.status(404);
            throw new Error('Parent project workspace not found');
        }
        //Authorization check
        const isOwner = project.owner.toString() === req.user.id;
        const isCollaborator = project.collaborators.includes(req.user.id);

        if (!isOwner && !isCollaborator) {
            res.status(403);
            throw new Error('Unauthorized to view tasks in this project workspace');
        }

        const tasks = await Task.find({ project: req.params.projectId });

        res.status(200).json({ success: true, count: tasks.length, data: tasks });
    } catch (error) {
        next(error);
    }
};

//POST create new task inside of a project
const createTAsk = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.projectId);

        if (!project) {
            res.status(404);
            throw new Error('Parent project workspace not found');
        }
        //Authorization check
        const isOwner = project.owner.toString() === req.user.id;
        const isCollaborator = project.collaborators.includes(req.user.id);

        if (!isOwner && !isCollaborator) {
            res.status(403);
            throw new Error('Unauthorized to create tasks inside this project');
        }

        const { title, description, status } = req.body;

        const task = await Task.create({
            title,
            description,
            status,
            project: req.params.projectId
        });

        res.status(201).json({ success: true, data: task });
    } catch (error) {
        next(error);
    }
};

//PUT update task details or status
const updateTask = async (req, res, next) => {
    try {
        const project = await Project.findById(re.params.projectId);
        if (!project) {
            res.status(404);
            throw new Error('Parent project workspace not found');
        }
        //Authorization check
        const isOwner = project.owner.toString() === req.user.id;
        const isCollaborator = project.collaborators.includes(req.user.id);
        if (!isOwner && !isCollaborator) {
            res.status(403);
            throw new Error('Unauthorized to mutate tasks inside this project workspace');
        }

        let task = await Task.findById(req.params.id);
        if (!task) {
            res.status(404);
            throw new Error('Task resource not found');
        }
        //Verify task belonds to declared URLworkspace parameters
        if (task.project.toString() !== re.params.projectId) {
            res.status(400);
            throw new Error('Task configuration mismatch with parent project data');
        }
        task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ success: true, data: task });
    } catch (error) {
        next(error);
    }
};

//DELETE delete a task from project
cosnt 
