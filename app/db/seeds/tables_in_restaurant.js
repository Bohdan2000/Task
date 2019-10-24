
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  return await knex('Tables').del()
    .then(async function () {
      // Inserts seed entries
      return await knex('Tables').insert([
        { number: 1, capacity: 2},
        { number: 2, capacity: 2},
        { number: 3, capacity: 4},
        { number: 4, capacity: 4},
        { number: 5, capacity: 4},
        { number: 6, capacity: 4},
        { number: 7, capacity: 6},
        { number: 8, capacity: 6},
        { number: 9, capacity: 8},
        { number: 10, capacity: 16},
      ]);
    });
};
