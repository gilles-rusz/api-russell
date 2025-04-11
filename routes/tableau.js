var express = require('express');
var router = express.Router();

const service = require('../services/tableau');

const private = require('../middlewares/private');

router.get('/', private.checkJWT, service.tableau);

router.post('/updateUser', private.checkJWT, service.updateUser);

router.post('/updateUser/:id', private.checkJWT, service.updateUserById);

router.get('/deleteUser/', private.checkJWT, service.deleteUser);

router.get('/updateCatway/:id', private.checkJWT, service.updateCatway);

router.post('/updateCatway/:id', private.checkJWT, service.updateCatwayById);

router.get('/deleteCatway/:id', private.checkJWT, service.deleteCatway);

router.post('/addResevation', private.checkJWT, service.addReservation);

router.get('/getResevationInfo/:id', private.checkJWT, service.getReservationInfo);

router.get('/deleteReservation/:id', private.checkJWT, service.deleteReservation);

module.exports = router;