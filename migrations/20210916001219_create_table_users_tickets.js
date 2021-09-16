exports.up = function(knex) {
    return knex.schema.createTable('ta_users_tickets', table => {
        table.increments('pk_user_ticket').primary().notNull()
        table.integer('fk_user').notNull().references('pk_user').inTable('tb_users')
        table.string('fk_ticket').notNull().references('pk_bar_code').inTable('tb_tickets')
        table.timestamp('tme_start').defaultTo(knex.fn.now()).notNull()
        table.timestamp('tme_end')
        table.timestamp('tme_exit')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('ta_users_tickets')
};