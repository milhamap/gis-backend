/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('list_schools', table => {
        table.increments('id'),
        table.string('name').unique(),
        table.string('slug').unique(),
        table.string('address'),
        table.string('accreditation', 1),
        table.string('since'),
        table.string('curriculum'),
        table.string('latitude'),
        table.string('longitude'),
        table.string('logo'),
        table.string('image'),
        table.timestamps(true, true)
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('list_schools')
};
