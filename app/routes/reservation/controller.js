const service = require('../../services/reservation/service');
const CONSTANTS = require('../../utils/constants');

const getAllReservation = async (req, res) => {
    return res.status(CONSTANTS.STATUS.Ok).json(await service.getAllReservation());
}

const createReservation = async (req, res) => {
    const { peopleConunt, timeReservationStart, timeReservationEnd } = req.body;
    const createReservation = await service.createReservation(peopleConunt, timeReservationStart, timeReservationEnd);
    if (createReservation === CONSTANTS.ALL_TABLES_BOOKED){
        return res.status(CONSTANTS.STATUS.BadRequest).json(createReservation);
    }
    return res.status(CONSTANTS.STATUS.Created).json(createReservation);
}

const getReservationById= async (req, res) => {
    const id = req.params.id;
    if (!id) return res.status(CONSTANTS.STATUS.BadRequest).json(CONSTANTS.BAD_REQUEST);
    const findOne = await service.getReservationById(id);
    if (findOne) return res.status(CONSTANTS.STATUS.Ok).json(findOne); 
    return res.status(CONSTANTS.STATUS.NotFound).json(CONSTANTS.NOT_FOUND);
    
}
const deleteReservation = async (req, res) => {
    const id = req.params.id;
    if (!id) return res.status(CONSTANTS.STATUS.BadRequest).json(CONSTANTS.BAD_REQUEST);
    const reservation = await service.getReservationById(id);
    if (reservation){
        const deletedReservation = await service.deleteReservation(id);
        return res.status(CONSTANTS.STATUS.Ok).json(deletedReservation); 
    }
    return res.status(CONSTANTS.STATUS.NotFound).json(CONSTANTS.NOT_FOUND);
}


const updateReservation = async (req, res) => {
    const { peopleConunt, timeReservationStart, timeReservationEnd } = req.body;
    const id = req.params.id;
    if (!id) return res.status(CONSTANTS.STATUS.BadRequest).json(CONSTANTS.BAD_REQUEST);
    const reservation = await service.getReservationById(id);
    if (reservation){
        const updateReservation = await service.updateReservation(id, peopleConunt, timeReservationStart, timeReservationEnd);
        if (updateReservation === CONSTANTS.ALL_TABLES_BOOKED){
            return res.status(CONSTANTS.STATUS.BadRequest).json(updateReservation);
        }
        return res.status(CONSTANTS.STATUS.Ok).json(updateReservation);  
    }
    return res.status(CONSTANTS.STATUS.NotFound).json(CONSTANTS.NOT_FOUND);
    
}

module.exports = {
    getAllReservation,
    createReservation,
    getReservationById,
    deleteReservation,
    updateReservation
}