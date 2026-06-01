const Project = require('../models/Project');
//GET api projects
const getProjects = async (req, res, next) => {
    try {
//Find projects by owner or collaborator
        const projects = await Project.find({
    $or: [{ owner: req.user.id }, { collaborators: req.user.id }]
}).populate('owner', 'name email');

res.status(200).json({ success: true, count: projects.length, data: projects });
    } catch (error) {
        next(error);
    }
};

//GET api project by id
const getProjectById = async (req, res, next) => {
    try {
const project = await Project.findById(req.params.id).populate('owner', 'name email');

if (!project) {
    res.status(404);
    throw new Error('Project resource not found');
}
//Strict authorization check
const isOwner = project.owner._id.toString() === req.user.id;
const isCollaborator = project.collaborators.includes(req.user.id);

if (!isOwner && !isCollaborator) {
    res.status(403);
    throw new Error('Not authorized to access this project workspace');
}

res.status(200).json({ success: true, data: project });
    } catch (error) {
        next(error);
    }
};

//POST api projects
const createProject = async (req, res, next) => {
    try {
        const { name, description } = req.body;
        //Authentication user id from protect middleware
        const project = await Project.create({
            name,
            description,
            owner: req.user.id
        });

        res.status(201).json({ success: true, data: project });
    } catch (error) {
        next(error);
    }
};

//PUT api projects id
const updateProject = async (req, res, next) => {
    try {
        let project = await Project.findById(req.params.id);

        if (!project) {
            res.status(404);
            throw new Error('Project resource not found');
        }
        //Security check for owner
        if (project.owner.toString() !== req.user.id) {
            res.status(403);
            throw new Error('Action forbidden. You do not own this project workspace');
        }

        project = await Project.findByIdAndUpdate(req.params.id.req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ success: true, data: project });
    } catch (error) {
        next(error);
    }
};

//DELETE api projects id
const deleteProject = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            res.status(404);
            throw new Error('Project resource not found');
        }
        //Security check for owner
        if (project.owner.toString() !== req.user.id) {
            res.status(403);
            throw new Error('Action forbidden. You do not own this project workspace');
        }

        await project.deleteOne();

        res.status(200).json({ success: true, message: 'Project workspace permanently deleted'});
    } catch (error) {
        next(error);
    }
};

module.exports ={
    getProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
};