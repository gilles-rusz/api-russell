const express = require('express');
const router = express.Router();
const services = require('../services/catways');
const Catway = require('../models/catway');

router.get('/', async (req, res, next) => {
    try {
      const catways = await Catway.find({});
      if (req.accepts('html')) {
        res.render('catways', {
          title: 'Liste des catways',
          catways
        });
      } else {
        res.json(catways);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur serveur lors du chargement des catways.');
    }
  });

router.get('/new', (req, res) => {
  res.render('catway-form', { title: 'Ajouter un catway', catway: null });
});

router.get('/:id/edit', async (req, res) => {
  const catway = await services.getByIdRaw(req.params.id); // à créer si non existant
  res.render('catway-form', { title: 'Modifier un catway', catway });
});

router.get('/:id', services.getById);
router.post('/', services.add);
router.put('/:id', services.update);
router.delete('/:id', services.delete);

module.exports = router;
