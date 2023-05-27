/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('marker_schools', table => {
        table.increments('id'),
        table.integer('marker_id').unsigned().references('id').inTable('markers').onDelete('CASCADE'),
        table.integer('list_school_id').unsigned().references('id').inTable('list_schools').onDelete('CASCADE'),
        table.timestamps(true, true)
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('marker_schools')
};
