const chalk = require('chalk');
const setupDB = require('./db');
const Job = require('../models/job');
const Company = require('../models/company');

const seedJobs = async () => {
    try {
        console.log(`${chalk.blue('✓')} ${chalk.blue('Seed Jobs started')}`);

        const jobsData = [
            {
                title: 'Software Engineer',
                description: 'We are looking for a skilled software engineer to join our team.',
                location: 'San Francisco, CA',
                salary: 100000,
            },
            {
                title: 'Marketing Manager',
                description: 'Seeking a creative marketing manager to lead our marketing efforts.',
                location: 'New York, NY',
                salary: 80000,
            },
            // Add more job data as needed
        ];

        const company = await Company.findOne({ name: 'Acme Corporation' }); // Change the company name as needed

        if (!company) {
            console.error('Company not found');
            return;
        }

        // Add company reference to each job
        const jobsWithCompany = jobsData.map((job) => ({
            ...job,
            company: company._id,
        }));

        // Insert jobs into the database
        await Job.insertMany(jobsWithCompany);
        console.log('Jobs data inserted successfully');

    } catch (error) {
        console.error('Error inserting jobs data:', error);
    }
};

(async () => {
    await setupDB().then(async () => {
        await seedJobs();
    });
})();
