const mongoose = require('mongoose');

var NewsSchema = new mongoose.Schema(
    {

        index: String,
        title: String,
        title_segmentation: [String],
        content: String,
        content_segmentation: [[String]]
    }
);

module.exports = mongoose.model('News', NewsSchema);
