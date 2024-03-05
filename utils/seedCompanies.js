const chalk = require('chalk');
const setupDB = require('./db');
const Company = require('../models/company');

const seedCompanies = async () => {
    try {
        console.log(`${chalk.blue('✓')} ${chalk.blue('Seed Companies started')}`);

        // Define company data
        const companiesData = [
            {
                name: 'Acme Corporation',
                industry: 'Technology',
                employees: 500,
                location: 'New York',
                website: 'https://www.acme.com',
                description: 'Acme Corporation is a leading technology company specializing in software development.',
                logoUrl: 'https://example.com/acme-logo.png',
                contactPerson: 'John Smith',
                contactEmail: 'john@example.com',
                contactPhone: '+1234567890'
            },
            {
                name: 'Widget Enterprises',
                industry: 'Manufacturing',
                employees: 200,
                location: 'Los Angeles',
                website: 'https://www.widgetenterprises.com',
                description: 'Widget Enterprises is a manufacturing company producing high-quality widgets for various industries.',
                logoUrl: 'https://example.com/widget-logo.png',
                contactPerson: 'Jane Doe',
                contactEmail: 'jane@example.com',
                contactPhone: '+1987654321'
            },

        ];


        // Insert companies into the database
        await Company.insertMany(companiesData);

        console.log(`${chalk.green('✓')} ${chalk.green('Seed Companies finished')}`);
    } catch (error) {
        console.log(
            `${chalk.red('x')} ${chalk.red('Error while seeding companies')}`
        );
        console.error(error);
    }
};

(async () => {
    await setupDB().then(async () => {
      await seedCompanies();
    });
  })();
