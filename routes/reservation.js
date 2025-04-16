const express = require('express');
const router = express.Router();
const reservationService = require('../services/reservation');
const Reservation = require('../models/reservation');
const User = require('../models/user');
const Catway = require('../models/catway');

router.get('/', async (req, res, next) => {
  try {
    const reservations = await Reservation.find({})
      .populate('userId')
      .populate('catwayId');
      
    const users = await User.find();
    const catways = await Catway.find();

    if (req.accepts('html')) {
      res.render('reservations', { 
        title: 'Liste des réservations', 
        reservations,
        users,
        catways
      });
    } else {
      res.json(reservations);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur serveur lors du chargement des réservations.');
  }
});



router.get('/new', async (req, res) => {
  try {
    const users = await User.find();
    const catways = await Catway.find();
    res.render('reservation-form', {
      title: 'Nouvelle réservation',
      reservation: null,
      users,
      catways
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors du chargement du formulaire.');
  }
});

router.get('/:id/edit', async (req, res) => {
  try {
    const reservation = await reservationService.getByIdRaw(req.params.id);
    const users = await User.find();
    const catways = await Catway.find();
    res.render('reservation-form', {
      title: 'Modifier une réservation',
      reservation,
      users,
      catways
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors du chargement du formulaire de modification.');
  }
});


router.get('/:id/:idReservation', reservationService.getById);
router.post('/:id', reservationService.add);
router.put('/:id/:idReservation', reservationService.update);
router.delete('/:id/:idReservation', reservationService.deleteReservation);

module.exports = router;
