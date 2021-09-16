exports.up = function(knex) {
    return knex.schema.createTable('tb_companies', table => {
        table.increments('pk_company').primary().notNull()
        table.string('cnpj', 14).notNull()
        table.string('nme_company').notNull()
        table.integer('fk_users_company').notNull().references('pk_user').inTable('tb_users')
        table.boolean('is_active').notNull()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('tb_companies')
};
