/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('majors').del()
  await knex('majors').insert([
    {id: 1, name: 'IPA'},
    {id: 2, name: 'IPS'},
    {id: 3, name: 'Bahasa'}
  ]);
};
