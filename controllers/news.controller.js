const News = require('../models/news.model');

exports.index = function(request, response)
{
    var is_first_object = true;
    response.setHeader('Content-Disposition', 'attachment; filename=news.json');
    response.setHeader('Content-Type', 'application/json');
    News.find().cursor()
    .on('data', function(document)
    {
        var prefix = is_first_object ? '[' : ',';
        const data = JSON.stringify(document);
        response.write(prefix + data, function(error)
        {
            return console.error(error);
        });
        is_first_object = false;
    })
    .on('end', function()
    {
        response.write(']', function(error)
        {
            return console.error(error);
        })
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
