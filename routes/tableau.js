const express = require('express');
const router = express.Router();

const services = require('../services/tableau');

// Tableau de bord
router.get('/tableau-de-bord', services.tableau);

// Utilisateur
router.post('/updateUser', services.updateUser);
router.post('/updateUser/:id', services.updateUserById);
router.get('/deleteUser/:id', services.deleteUser);

// Catway
router.get('/updateCatway/:id', services.updateCatway);
router.post('/updateCatway/:id', services.updateCatwayById);
router.get('/deleteCatway/:id', services.deleteCatway);

// Réservations
router.post('/addReservation', services.addReservation);
router.get('/getReservationInfo/:id', services.getReservationInfo);
router.get('/deleteReservation/:id', services.deleteReservation);

module.exports = router;

