const service = require('../../services/reservation/service');
const CONSTANTS = require('../../utils/constants');

const getAllTables = async (req, res) => {
    return res.status(CONSTANTS.STATUS.Ok).json(await service.getAllReservation());
}

module.exports = {
    getAllTables,
}