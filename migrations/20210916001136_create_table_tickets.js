exports.up = function(knex) {
    return knex.schema.createTable('tb_tickets', table => {
        table.string('pk_bar_code').primary().notNull()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('tb_tickets')
};