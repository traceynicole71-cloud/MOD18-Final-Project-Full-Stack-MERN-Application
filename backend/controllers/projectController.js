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