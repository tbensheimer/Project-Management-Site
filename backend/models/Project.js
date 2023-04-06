const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    comments: {
        type: Array,
        required: true
    },
    createdBy: {
        type: Schema.Types.Mixed,
        required: true
    },
    assignedUserList: {
        type: Array,
        required: true
    }
});

projectSchema.statics.createProject = async function(name, details, category, dueDate, comments, createdBy, assignedUserList) {

    if(!name || !details || !category || !dueDate || !comments || !createdBy || !assignedUserList) {
        throw Error('Please fill all fields');
    }

    const project = await this.create({name, details, category, dueDate, comments, createdBy, assignedUserList});

    if(project) {
        return project;
    }
    else {
        throw Error("There was an error creating project");
    }
}


module.exports = mongoose.model("Project", projectSchema);