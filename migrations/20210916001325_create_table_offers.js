exports.up = function(knex) {
    return knex.schema.createTable('tb_offers', table => {
        table.increments('pk_offer').primary().notNull()
        table.integer('fk_companies_offers').notNull().references('pk_company').inTable('tb_companies')
        table.integer('fk_users_offers').notNull().references('pk_user').inTable('tb_users')
        table.timestamp('tme_begin', options={useTz: false}).notNull()
        table.timestamp('tme_end', options={useTz: false}).notNull()
        table.binary('img').notNull()
        table.boolean('is_active').notNull()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('tb_offers')
};
