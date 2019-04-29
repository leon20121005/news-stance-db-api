const mongoose = require('mongoose');
const express = require('express');
const app = express();

const DATABASE_URL = 'mongodb://localhost/news_stance';
const PORT = 3000;

mongoose.connect(DATABASE_URL, {useNewUrlParser: true});

const news = require('./routes/news.route');
app.use('/news', news);

app.get('/', function(request, response)
{
    response.send('Welcome!');
});

app.listen(PORT, function()
{
    console.log(`Example app listening on port ${PORT}!`);
});
