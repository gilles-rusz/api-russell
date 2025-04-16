const User = require('../models/user');
const Catway = require('../models/catway');
const Reservation = require('../models/reservation');



exports.tableau = async (req, res, next) => {
    try {
      const users = await User.find({});
      const catways = await Catway.find({});
      const reservations = await Reservation.find({});
      const catwayDoc = await Catway.findOne({});
      const catwayId = catwayDoc ? catwayDoc._id : null;
  
      return res.render('tableau-de-bord', { 
        title: 'Tableau de bord', 
        users: users,
        catways: catways,
        reservations: reservations,
        catwayId: catwayId,
        user: { name: 'Utilisateur Test', email: 'test@example.com' }
      });
    } catch (error) {
      console.error('Erreur dans tableau-de-bord :', error);
      return res.status(500).json({ message: 'Erreur affichage tableau', error });
    }
  };
  

exports.addReservation = async (req, res) => {
    try {
        const { catwayId, clientName, boatName, checkIn, checkOut } = req.body;

        const catway = await Catway.findById(catwayId);
        if (!catway) return res.status(404).json({ message: 'Catway introuvable' });

        const newReservation = new Reservation({
            catwayNumber: catway.catwayNumber,
            clientName,
            boatName,
            startDate: checkIn,
            endDate: checkOut
        });

        await newReservation.save();

        return res.redirect('/tableau'); 
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erreur lors de la création de la réservation' });
    }
};

exports.getReservationInfo = async (req, res) => {
    try {
        const { id } = req.params;

        const reservation = await Reservation.findById(id);
        if (!reservation) return res.status(404).json({ message: 'Réservation introuvable' });

        return res.render('reservationInfo', {
            title: 'Détail de la réservation',
            reservation
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erreur lors de la récupération des infos de réservation' });
    }
};
exports.updateUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;

        const user = await User.findByIdAndUpdate(id, { name, email }, { new: true });
        if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

        return res.redirect('/tableau');
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'utilisateur' });
    }
}
exports.updateUser = async (req, res) => {
    return res.status(501).json({ message: 'updateUser sans ID pas encore implémenté' });
};


exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        return res.redirect('/tableau');
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur' });
    }
};


exports.updateCatway = async (req, res) => {
    try {
        const catway = await Catway.findById(req.params.id);
        if (!catway) return res.status(404).json({ message: 'Catway non trouvé' });

        return res.render('updateCatway', {
            title: 'Modifier un catway',
            catway
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erreur affichage catway' });
    }
};

exports.updateCatwayById = async (req, res) => {
    try {
        const { id } = req.params;
        const { catwayNumber } = req.body;

        await Catway.findByIdAndUpdate(id, { catwayNumber });
        return res.redirect('/tableau');
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erreur modification catway' });
    }
};
exports.deleteCatway = async (req, res) => {
    try {
        const { id } = req.params;
        await Catway.findByIdAndDelete(id);
        return res.redirect('/tableau');
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erreur suppression catway' });
    }
};


exports.deleteReservation = async (req, res) => {
    try {
        const { id } = req.params;
        await Reservation.findByIdAndDelete(id);
        return res.redirect('/tableau');
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erreur suppression réservation' });
    }
};

