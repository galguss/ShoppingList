const mongoose = require('mongoose');

const categoriesSchema = mongoose.Schema({
    category: {
        require: true,
        type: String
    }
});

module.exports = mongoose.model('categories', categoriesSchema);