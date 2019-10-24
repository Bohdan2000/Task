const config = require('../../db/config/config')
const knex = require('knex')(config.database);

const getAllTables = async () => {
    const findAll = await knex('Tables');
    return findAll;
}

const getTablesFilteredByPeopleCount = async (peopleCount) => {
    const tables = await knex('Tables').where((builder) =>
        builder.where({'booked': false})
    )
    .andWhere(function() {
        this.where('number', '>=', peopleCount)
    })
    return tables;
}

const setBookedStatus = async (id, status) => {
    const tables = await knex('Tables').where((builder) =>
        builder.where({'id': id})
    ).update({booked: status})
    return tables;
}

const getTableById = async (id) => {
    const [tables] = await knex('Tables').where((builder) =>
        builder.where({'id': id})
    )
    return tables;
}

module.exports = {
    getAllTables,
    getTablesFilteredByPeopleCount,
    setBookedStatus,
    getTableById,
}