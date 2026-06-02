//Mongoose schema for tasks
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please provide a task title'],
            trim: true,
            maxlength: [100, 'Task title cannot exceed 100 characters']
        },
        description: {
            type: String,
            required: [true, 'Please provide a task description'],
            maxlength: [500, 'Task description cannot exceed 500 characters']
        },
        status: {
            type: String,
            required: true,
            enum: {
                values: ['To Do', 'In Progress', 'Done'],
                message: '{VALUE} is not a valid task status. Use "To Do", "In Progress", or "Done".'
            },
            default: 'To Do'
        },
        project: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project',
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Task', taskSchema);