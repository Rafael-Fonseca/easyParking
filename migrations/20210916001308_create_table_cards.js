exports.up = function(knex) {
    return knex.schema.createTable('tb_cards', table => {
        table.increments('pk_card').primary().notNull()
        table.integer('fk_users_card').notNull().references('pk_user').inTable('tb_users')
        table.string('num_cd', 32).notNull()
        table.string('nme_cd_holder', 100).notNull()
        table.string('validity', 14).notNull()
        table.boolean('credit').notNull()
        table.string('nme_cd', 50).notNull()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('tb_cards')
};
