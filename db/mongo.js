const { ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose')

const clientOption = {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
};

exports.initClientDbConnection = async () => {
    try { await mongoose.connect(process.env.URL_MONGO, clientOption)
        console.log("connected")
      } catch (error) {
        console.log(error);
        throw e
    }
};