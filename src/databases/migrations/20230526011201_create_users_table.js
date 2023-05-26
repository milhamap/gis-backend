/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id'),
        table.string('email').unique(),
        table.string('password'),
        table.integer('role_id').unsigned().references('id').inTable('roles').onDelete('CASCADE').onUpdate('CASCADE'),
        table.string('refresh_token').nullable(),
        table.timestamps(true, true)
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('users')
};
