const Reservation = require('../models/reservation');
const Catway = require('../models/catway');
const { validationResult } = require('express-validator');

const getAll = async (req, res) => {
    try {
        const reservations = await Reservation.find();
        return res.status(200).json(reservations);
    } catch (err) {
        return res.status(500).json({ message: 'Erreur serveur', err });
    }
};

const getById = async (req, res) => {
    const { id, idReservation } = req.params;

    try {
        const catway = await Catway.findById(id);
        if (!catway) return res.status(404).json('catway-not-found');

        const reservation = await Reservation.findById(idReservation);
        if (!reservation) return res.status(404).json("Aucune réservation trouvée");

        return res.render('reservationInfo', {
            title: 'Information réservation',
            reservation,
            catway,
        });
    } catch (e) {
        return res.status(501).json(e);
    }
};

const add = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const id = req.params.id;

    try {
        const catway = await Catway.findById(id);
        if (!catway) return res.status(404).json("catway-not-found");

        const temp = {
            userId: req.body.userId,
            catwayId: req.body.catwayId,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
          };
          

        const reservation = await Reservation.create(temp);
        return res.status(201).json(reservation);
    } catch (e) {
        return res.status(501).json(e);
    }
};

const update = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { id, idReservation } = req.params;

    try {
        const catway = await Catway.findById(id);
        if (!catway) return res.status(404).json("catway-not-found");

        const reservation = await Reservation.findById(idReservation);
        if (!reservation) return res.status(404).json("reservation_non_trouvée");

        const temp = {
            userId: req.body.userId,
            catwayId: req.body.catwayId,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
          };
          

        Object.keys(temp).forEach(key => {
            if (temp[key]) reservation[key] = temp[key];
        });

        await reservation.save();
        return res.status(201).json(reservation);
    } catch (e) {
        return res.status(501).json(e);
    }
};

const deleteReservation = async (req, res) => {
    const { id, idReservation } = req.params;

    try {
        const catway = await Catway.findById(id);
        if (!catway) return res.status(404).json("catway-not-found");

        await Reservation.deleteOne({ _id: idReservation });
        return res.status(204).json('delete_ok');
    } catch (e) {
        return res.status(501).json(e);
    }
};
async function getByIdRaw(id) {
    return await Reservation.findById(id);
  }
  

module.exports = {
    getAll,
    getById,
    getByIdRaw,
    add,
    update,
    deleteReservation
};
