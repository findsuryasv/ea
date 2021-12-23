const mongoose = require('mongoose');


const itemSchema = mongoose.Schema({
        name: String,
        category: String,
        price: Number
});


module.exports = mongoose.model('item', itemSchema);