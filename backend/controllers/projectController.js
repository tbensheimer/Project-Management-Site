const Project = require('../models/Project');
const mongoose = require('mongoose');
let ObjectId = mongoose.Types.ObjectId; 


const getAllProjects = async (req, res) => {

    try {
        const projects = await Project.find({isCompleted: 0});

        res.status(200).json({projects});
    }
    catch (error) {
        res.status(400).json({error: error.message});
    }
}

const createProject = async (req, res) => {
    try {
        const {name, details, category, dueDate, comments, createdBy, assignedUserList, isCompleted} = req.body;

        const project = await Project.createProject(name, details, category, dueDate, comments, createdBy, assignedUserList, isCompleted);

        res.status(200).json({project});

    }
    catch (error) {
        return res.status(400).json({error: error.message});
    }
}

const getProjectDetails = async (req, res) => {

const id = req.params.id;

if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: "No project with given Id"});
}

try {
    const project = await Project.findById(id);

    if(project) {
        return res.status(200).json(project);
    }
}
catch (error) {
    res.status(400).json({error: error.message});
}
}

const addProjectComment = async (req, res) => {
    const id = req.params.id;
    const newComment = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: "No project with given Id"});
    }

    try {
        const project = await Project.findById(id);

        project.comments = [...project.comments, newComment];

         await Project.findByIdAndUpdate(id, project);

        if(project) {
            return res.status(200).json(project);
        }
    }
    catch (error) {
        res.status(400).json({error: error.message});
    }
}

const getProjectComments = async (req, res) => {
    const id = req.params.id;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: "No project with given Id"});
    }

    try {
        const project = await Project.findById(id);

        if(project) {
            return res.status(200).json({comments: project.comments})
        }
    }
    catch (error) {
        return res.status(400).json({error: error.message})
    }
}

const completedProject = async (req, res) => {

    try {
    const project = req.body;

    const completedProject = await Project.findOneAndUpdate({_id: new ObjectId(project._id)}, {isCompleted: true});

    return res.status(200).json({complete: completedProject});
    }
    catch (error) {
        return res.status(400).json({error: error.message});
    }

}

module.exports = {getAllProjects, createProject, getProjectDetails, addProjectComment, getProjectComments, completedProject};