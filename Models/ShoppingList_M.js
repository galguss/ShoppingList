const mongoose = require('mongoose');

const ListSchema = mongoose.Schema({
    item: {
        require: true,
        type: String
    },
    Amount: {
        require: true,
        type: Number
    },
    category: {
        require: true,
        type: String
    },
    user:{
        require: true,
        type: String
    },
    item_purchased:{
        require: true,
        type: Boolean
    }
});


module.exports = mongoose.model('item_List', ListSchema);