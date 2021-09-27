exports.up = function(knex) {
    return knex.schema.createTable('tb_users', table => {
        table.increments('pk_user').primary().notNull()
        table.string('name', 100).notNull()
        table.string('password').notNull()
        table.string('mail', 100).notNull()
        table.integer('fk_roles_user').notNull().references('pk_role').inTable('td_roles')
        table.string('cpf', 11).notNull().unique()
        table.boolean('is_active').notNull()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('tb_users')
};
