const mongoose = require('mongoose');

const catwaySchema = mongoose.Schema(
    {
        catwayNumber: {
            type: Number,
            require: true
        },

        type: {
            type: String,
            require: true,
            enum: ['long', 'short'],
        }, 

        catwayState: {
            type: String,
            message: "Must be long or short."
        }
    }
);

const Catway = mongoose.model('Catway', catwaySchema);
module.exports = Catway;