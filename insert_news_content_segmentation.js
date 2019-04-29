const mongoose = require('mongoose');
const fs = require('fs');
const News = require('./models/news.model');

const DATABASE_URL = 'mongodb://localhost/news_stance';

mongoose.connect(DATABASE_URL, {useNewUrlParser: true});

const pad_zero = function(number, width)
{
    number = String(number);
    if (number.length >= width)
    {
        return number;
    }
    else
    {
        return new Array(width - number.length + 1).join('0') + number;
    }
}

for (var index = 1; index <= 10000; index++)
{
    const news_file = fs.readFileSync(`./NC_1 seg_context/news_${pad_zero(index, 6)}.json`);
    const news_object = JSON.parse(news_file);
    News.create(news_object, function(error, document)
    {
        if (error)
        {
            return console.error(error);
        }
    });
}
