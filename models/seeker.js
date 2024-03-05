const mongoose = require('mongoose');
const User = require('./user');

const seekerSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    skills: {
        type: [String]
    },
    experience: {
        type: Number
    },
    appliedJobs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job'
    }]

    // Add additional fields specific to seekers
});

const Seeker = mongoose.model('Seeker', seekerSchema);