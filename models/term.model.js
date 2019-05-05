const mongoose = require('mongoose');

var TermSchema = new mongoose.Schema(
    {
        id: Number,
        term: String,
        idf: Number,
        tf: [[mongoose.Schema.Types.Mixed]]
    }
);

module.exports = mongoose.model('Term', TermSchema);
