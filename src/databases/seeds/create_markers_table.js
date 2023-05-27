/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('markers').del()
  await knex('markers').insert([
    {id: 1, name: '#0d7dfa', region: 'SMAN SURABAYA'},
    {id: 2, name: '#130dfa', region: 'SMKN SURABAYA'},
    {id: 3, name: '#fa0d7d', region: 'SMAN GRESIK'},
    {id: 4, name: '#fa140d', region: 'SMKN GRESIK'},
    {id: 5, name: '#7dfa0d', region: 'SMAN SIDOARJO'},
    {id: 6, name: '#0dfa14', region: 'SMKN SIDOARJO'},
  ]);
};
