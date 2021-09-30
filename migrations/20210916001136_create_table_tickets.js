exports.up = function(knex) {
    return knex.schema.createTable('tb_tickets', table => {
        table.increments('pk_bar_code').primary().notNull()
        table.integer('fk_user').references('pk_user').inTable('tb_users')
        table.timestamp('tme_start', options={useTz: false}).defaultTo(knex.fn.now()).notNull()
        table.timestamp('tme_end', options={useTz: false})
        table.timestamp('tme_exit', options={useTz: false})
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('tb_tickets')
};