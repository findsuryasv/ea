const mongoose = require('mongoose');


const orderSchema = mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
    },
    items: {
        type: Array,
        default: []
    },
});

module.exports =  mongoose.model('order', orderSchema);