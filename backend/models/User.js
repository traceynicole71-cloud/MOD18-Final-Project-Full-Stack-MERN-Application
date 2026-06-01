const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email'
        ]
    },
    password: {
        type: String,
        required: {true, 'Please add a password',
            minlength: 6,
            select: false
    }
}, { timestamps, true });

//Pre-save hook to hash password before storing
userSchema.pre('save', async function (next) {
    //Hash if its not modified
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcryot.genSalt(10);
    this.password = await bcrypt.hasg(this.password, salt);
});

//Compare password with hashed password
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);