const News = require('../models/news.model');

exports.index = function(request, response)
{
    News.find(function(error, documents)
    {
        if (error)
        {
            return console.error(error);
        }
        if (documents.length == 0)
        {
            return response.send('document length: 0');
        }
        const data = JSON.stringify(documents);
        response.setHeader('Content-Disposition', 'attachment; filename=news.json');
        response.setHeader('Content-Type', 'application/json');
        response.write(data, function(error)
        {
            response.end();
        });
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
