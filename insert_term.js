const mongoose = require('mongoose');
const fs = require('fs');
const Term = require('./models/term.model');

const DATABASE_URL = 'mongodb://localhost/news_stance';

mongoose.connect(DATABASE_URL, {useNewUrlParser: true});

const insert_terms = function(number_of_file)
{
    const term_file = fs.readFileSync(`../result/part-0000${number_of_file}`);
    const term_string_list = term_file.toString().replace(/'/g, '"').split('\n').filter(function(term_string)
    {
        return term_string != '';
    });
    const term_object_list = term_string_list.map(function(term_string)
    {
        return JSON.parse(term_string);
    });
    Term.collection.insertMany(term_object_list, function(error, result)
    {
        if (error)
        {
            return console.error(error);
        }
        console.log(`${result.insertedCount} terms inserted`);
        number_of_file = number_of_file + 1;
        if (number_of_file < 10)
        {
            insert_terms(number_of_file);
        }
        else
        {
            process.exit();
        }
    });
}

insert_terms(0);
