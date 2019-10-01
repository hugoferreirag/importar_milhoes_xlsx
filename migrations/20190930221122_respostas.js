
exports.up = function(knex, Promise) {
    return knex.schema.createTable('respostas', table =>{
        table.increments('id').primary()
        table.integer('id_projeto')
        table.integer('id_fase')
        table.integer('id_aplic')
        table.string('num_cand')
        table.string('respostas')
        table.string('vetor_acertos')
        table.boolean('ausente').defaultTo(true)
        table.boolean('eliminado_ibfc').defaultTo(false)
    })
  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('respostas')
};
