const Booking = require('../models/booking');
const Catway = require('../models/catway');



exports.getById = async (req, res, next) => {
    const id = req.params.id
    const idReservation = req.params.idReservation 

    try {
        let catway = await Catway.findById(id);

        if (catway) {
            let reservation = await Reservation.findById(idReservation)
                if (reservation) {
                    return res.render('reservationInfo', { title: 'Information réservation', reservation: reservation, catway: catway })
                }
            return res.status(404).json("Aucune réservation trouvé");
        }

        return res.status(404).json('catway-not-found');
    } catch (e) {
        return res.status(501).json(e);
    }
}
exports.add = async (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const id = req.params.id;
    let catway = await Catway.findById(id);

    if (catway) {
        const temp = ({
            resrevationId: req.body.reservationId,
            catwayNumber: catway.catwayNumber,
            clientName: req.body.clientName,
            boatName: req.body.boatName,
            checkIn: req.body.checkIn,
            checkOut: req.body.checkOut
        })

        try {
            let reservation = await reservation.create(temp);

            return res.status(201).json(reservation);
        } catch (e) {
            return res.status(501).json(e);
        }
    }
}; 

exports.update = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const id = req.params.id;
    let catway = await Catway.findById(id);

    if (catway) {
        const temp = ({
            reservationId: req.body.reservationId,
            catwayNumber: catway.catwayNumber,
            clientName: req.body.clientName,
            boatName: req.body.boatName,
            checkIn: req.body.checkIn,
            checkOut: req.body.checkOut
        })

        const idReservation = req.params.idReservation;

        try {
            let reservation = await Reservation.findById(idReservation);

            if (reservation) {
                Object.keys(temp).forEach((key) => {
                    if (!!temp[key]) {
                        reservation[key] = temp[key];
                    }
                });

                await reservation.save();
                return res.status(201).json(reservation);
            }

            return res.status(404).json("reservation_non_trouvée");
        } catch (e) {
            return res.status(501).json(e);
        }
    }
} 
exports.delete = async (req, res, next) => {
    const id = req.params.id;
    let catway = await Catway.findById(id);

    if (catway) {
        const idReservation = req.params.idReservation;

        try {
            await reservation.deleteOne({ _id: idReservation });
    
            return res.status(204).json('delete_ok');
        } catch (e) {
            return res.status(501).json(e)
        }
    }
};
