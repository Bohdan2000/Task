const config = require('../../db/config/config');
const tableService = require('../table/service');
const CONSTANTS = require('../../utils/constants');
const knex = require('knex')(config.database);


const getAllReservation = async () => {
    const findAll = await knex('Reservations');
    return findAll;
}

const createReservation = async (peopleCount, timeReservationStart, timeReservationEnd) => {
    const [tables] = await tableService.getTablesFilteredByPeopleCount(peopleCount);
    if (!tables){
        return CONSTANTS.ALL_TABLES_BOOKED;
    }
    await knex('Reservations').insert({table_id: tables.id , reservation_start_time: timeReservationStart, reservation_end_time: timeReservationEnd});
    await tableService.setBookedStatus(tables.id, true);
    const [reservation] = await knex('Reservations').where({'table_id': tables.id});
    const table = await tableService.getTableById(tables.id);
    return {
        ...reservation,
        table
    };
}

const getReservationById= async (id) => {
    const [reservation] = await knex('Reservations').where({'id': id});
    return reservation;
}

const deleteReservation = async (id) => {
    await knex('Reservations').where({'id': id}).del();
    return CONSTANTS.SUCCESS; 
}


const updateReservation = async (id, peopleCount, timeReservationStart, timeReservationEnd) => {
    const [tables] = await tableService.getTablesFilteredByPeopleCount(peopleCount);
    if (!tables){
        return CONSTANTS.ALL_TABLES_BOOKED;
    }
    const [oldReservation] = await knex('Reservations').where({'id': id});
    await knex('Reservations').where({'id': id}).update({table_id: tables.id, reservation_start_time: timeReservationStart, reservation_end_time: timeReservationEnd});
    await tableService.setBookedStatus(oldReservation.id, false);
    await tableService.setBookedStatus(tables.id, true);
    const [reservation] = await knex('Reservations').where({'table_id': tables.id});
    const table = await tableService.getTableById(tables.id);
    return {
        ...reservation,
        table
    };
}

module.exports = {
    getAllReservation,
    createReservation,
    getReservationById,
    deleteReservation,
    updateReservation
}