const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recruiter'
    },
    applicants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seeker'
    }]
});

module.exports = mongoose.model('Job', jobSchema);
