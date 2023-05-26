const bcrypt = require('bcrypt')
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const salt = bcrypt.genSaltSync(10)
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {
      id: 1, 
      email: 'admin@schoolplace.com',
      password: bcrypt.hashSync('admins', salt),
      role_id: 1
    }
  ]);
};
