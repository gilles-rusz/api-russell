const express = require('express');
const router = express.Router();
const { checkJWT } = require('../middlewares/private'); 
const services = require('../services/user');
const User = require('../models/user');



router.get('/', async (req, res, next) => {
    try {
      const users = await User.find({});
      if (req.accepts('html')) {
        res.render('users', {
          title: 'Liste des utilisateurs',
          users
        });
      } else {
        res.json(users);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur serveur lors du chargement des utilisateurs.');
    }
  });


router.get('/new', (req, res) => {
  res.render('user-form', { title: 'Ajouter un utilisateur', user: null });
});

router.get('/:id/edit', async (req, res) => {
  const user = await services.getByIdRaw(req.params.id); // méthode utilitaire à créer si besoin
  res.render('user-form', { title: 'Modifier un utilisateur', user });
});



router.get('/me', checkJWT, (req, res) => {
  const user = req.decoded.user;

  if (!user) return res.status(404).json({ message: 'Utilisateur introuvable' });

  res.json({
    name: user.name,
    email: user.email,
    id: user._id
  });
});

router.get('/id/:id', services.getById);
router.get('/email/:email', services.getByEmail);
router.post('/', services.add);
router.put('/:id', services.update);
router.delete('/:id', services.delete);
router.post('/login', services.authenticate);
router.get('/logout', services.logout);

module.exports = router;
