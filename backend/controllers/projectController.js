const Project = require('../models/Project');

const getAllProjects = async (req, res) => {

    try {
        const projects = await Project.find();

        res.status(200).json({projects});
    }
    catch (error) {
        res.status(400).json({error: error.message});
    }
}

const createProject = async (req, res) => {
    try {
        const {name, details, category, dueDate, comments, createdBy, assignedUserList} = req.body;

        const project = await Project.createProject(name, details, category, dueDate, comments, createdBy, assignedUserList);

        res.status(200).json({project});

    }
    catch (error) {
        return res.status(400).json({error: error.message});
    }
}

module.exports = {getAllProjects, createProject};