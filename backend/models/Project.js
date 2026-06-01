const mongoose = require('mongoose');
const projectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide a project name'],
            trim: true,
            maxlength: [100, 'Project name cannot exceed 100 characters']
        },
        description: {
            type: String,
            required: [true, 'Please provide a project description'],
            maxLength: [500, 'Description cannot exceed 500 characters']
        },
       //Strict ownership rules
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        collaborators: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
       timestamps: true 
    }
);

module.exports = mongoose.model('Project', projectSchema);