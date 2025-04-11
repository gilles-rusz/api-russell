const mongoose = require('mongoose');

const reservationSchema = mongoose.Schema(
    {  
        catwayNumber: {
            type: Number,
            require: true
        },

        clientName: {
            type: String,
            trim: true,
            require: true
        },

        boatName: {
            type: String,
            trim: true,
            require: true
        },

        startDate: {
            type: Date,
            require: true
        }, 

        endStart: {
            type: Date,
            require: true
        }
    }
);

const reservation = mongoose.model('reservation', reservationSchema);
module.exports = reservation;