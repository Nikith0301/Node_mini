const mongoose = require('mongoose')

const locationSchema = new mongoose.Schema({
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    accuracy: { type: Number } // Optional, adjust based on your data
});

module.exports = mongoose.model('Location ', locationSchema)