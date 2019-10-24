const express = require('express');

const reservationController = require('./controller');

const router = express.Router();

router
    .get('/', reservationController.getAllReservation)
    .post('/', reservationController.createReservation)
    .get('/:id', reservationController.getReservationById)
    .delete('/:id',reservationController.deleteReservation)
    .put('/:id', reservationController.updateReservation)

module.exports = router;