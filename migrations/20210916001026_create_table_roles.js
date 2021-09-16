exports.up = function(knex) {
    return knex.schema.createTable('td_roles', table => {
        table.increments('pk_role').primary().notNull()
        table.string('role', 50).notNull()
        table.float('discount').notNull()
        table.boolean('is_active').notNull()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('td_roles')
};
