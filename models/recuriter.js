const mongoose = require('mongoose');
const User = require('./user');

const recruiterSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    },
    position: {
        type: String
    },
    postedJobs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job'
    }]
});

const Recruiter = mongoose.model('Recruiter', recruiterSchema);