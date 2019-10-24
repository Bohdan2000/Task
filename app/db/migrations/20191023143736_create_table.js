
exports.up = async knex => {
    await knex.schema.createTable('Tables', t => {
       t.bigIncrements('id')
       .primary()
       .notNullable();
       t.bigInteger('number').notNullable();
       t.bigInteger('capacity').notNullable();
       t.boolean('booked').defaultTo(false);
     })
   
    await knex.schema.createTable('Reservations', t => {
     t.bigIncrements('id')
     .primary()
     .notNullable();
     t.bigInteger('table_id').unsigned().notNullable();
     t.foreign('table_id').references('id').inTable('Tables');
     t.datetime('reservation_start_time');
     t.datetime('reservation_end_time');
   })
 };

 
 exports.down = async knex => {
    await knex.schema.dropTable('Reservations');
    await knex.schema.dropTable('Tables');
 };
 