exports.up = function(knex) {
    return knex.schema.createTable('tb_settings', table => {
        table.increments('pk_setting').primary().notNull()
        table.integer('fk_users_settings').notNull().references('pk_user').inTable('tb_users')
        table.timestamp('update_at', options={useTz: false}).defaultTo(knex.fn.now()).notNull()
        table.float('min_cost').notNull()
        table.boolean('is_active').notNull()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('tb_settings')
};