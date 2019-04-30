const News = require('../models/news.model');

exports.index = function(request, response)
{
    response.setHeader('Content-Disposition', 'attachment; filename=news.json');
    response.setHeader('Content-Type', 'application/json');
    News.find().cursor()
    .on('data', function(document)
    {
        const data = JSON.stringify(document);
        response.write(data, function(error)
        {
            return console.error(error);
        });
    })
    .on('end', function()
    {
        response.end();
    });
};

exports.show = function(request, response)
{
    const index = request.params.id;
    News.findOne({index: index}, function(error, document)
    {
        if (error)
        {
            return console.error(error);
        }
        if (document == null)
        {
            return response.send('document length: 0');
        }
        response.send(document);
    });
};
