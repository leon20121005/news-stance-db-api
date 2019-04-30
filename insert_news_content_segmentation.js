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

const insert_news = function(round)
{
    const news_object_list = [];
    for (var index = round * 10000 + 1; index <= (round + 1) * 10000; index++)
    {
        const news_file = fs.readFileSync(`../NC_1 seg_context/news_${pad_zero(index, 6)}.json`);
        const news_object = JSON.parse(news_file);
        news_object_list.push(news_object);
    }
    News.insertMany(news_object_list, function(error, documents)
    {
        if (error)
        {
            return console.error(error);
        }
        console.log(`${documents.length} news inserted`);
        round = round + 1;
        if (round < 10)
        {
            insert_news(round);
        }
        else
        {
            process.exit();
        }
    });
}

insert_news(0);
