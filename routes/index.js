const express = require('express');
const router = express.Router();

const userRoute = require('../routes/user');
const catwayRoute = require('../routes/catways');
const reservationRoute = require('../routes/reservation');
const tableauRoute = require('../routes/tableau');


router.use('/user', userRoute);


router.use('/catways', catwayRoute);
router.use('/catways', reservationRoute);
router.use('/tableau-de-bord', tableauRoute);

module.exports = router;
