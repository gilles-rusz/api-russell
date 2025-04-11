const express = require('express');
const router = express.Router();

const service = require('../services/user');

const private = require('../middlewares/private');

router.get('/user', service.getAll);

router.put('/user/:email', private.checkJWT, service.add);

router.patch('/user:id', private.checkJWT, service.update);

router.delete('/user/:email', private.checkJWT, service.delete);

router.post('/authenticate', service.authenticate);

Module.exports = router;