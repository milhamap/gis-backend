/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('major_schools', table => {
        table.increments('id'),
        table.integer('major_id').unsigned().references('id').inTable('majors').onDelete('CASCADE'),
        table.integer('school_id').unsigned().references('id').inTable('list_schools').onDelete('CASCADE'),
        table.timestamps(true, true)
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('major_schools')
};
