'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('admins', [{
      
        username: 'admin1',
        phone_number: '1234567890',
        email: 'admin1@example.com',
        password:await bcrypt.hash('password1',5),
        address: ['Address 1', 'Address 2'],
        is_verified: true,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'admin2',
        phone_number: '9876543210',
        email: 'user2@example.com',
        password: await bcrypt.hash('password2',5),
        address: ['Address 3'],
        is_verified: true,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'admin3',
        phone_number: '5555555555',
        email: 'admin@example.com',
        password: await bcrypt.hash('adminpassword',5),
        address: ['Admin Address'],
        is_verified: true,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
  ])
  },

  async down (queryInterface, Sequelize){
    return queryInterface.bulkDelete('admins', null, {});
  }
};
