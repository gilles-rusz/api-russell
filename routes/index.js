const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
    res.render('index', { title: 'Accueil - Port de Russell' });
  });

  router.get('/docs', (req, res) => {
    res.render('docs');
  });
  

const userRoute = require('./users'); 
const catwayRoute = require('./catways');
const reservationRoute = require('./reservation');
const tableauRoutes = require('./tableau');

router.use('/users', userRoute); 
router.use('/catways', catwayRoute);
router.use('/reservations', reservationRoute); 
router.use('/', tableauRoutes);

module.exports = router;

