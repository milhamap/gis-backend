/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('detail_schools', table => {
        table.increments('id'),
        table.integer('school_id').unsigned().references('id').inTable('list_schools').onDelete('CASCADE'),
        table.string('name_headmaster')
        table.integer('count_class'),
        table.integer('count_student'),
        table.text('description'),
        table.timestamps(true, true)
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('detail_schools')
};
