const User = require('../models/user');
const Catway = require('../models/catway');
const reservation = require('../models/reservation');

exports.tableau = async (req, res, next) => {
    try {
        const users = await User.find({});
        const catways = await Catway.find({});
        const reservation = await reservation.find({});
        const catwayId = await Catway.findOne({});
        return res.render('dashboard', { 
            title: 'Tableau de bord', 
            users: users,
            catways: catways,
            booking: booking,
            catwayId: catwayId._id
        })
    } catch (error) {
        return res.status(500).json(error);
    }
}
