// import dependencies
const { application } = require('express');
var express = require('express');
var app = express();
var apiRoutes = require('./routes/api');
var rootRoutes = require('./routes/root');
var morgan = require('morgan');


//set up our app (server/middleware)
app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

app.use(morgan('combined'));

//endpoints

app.use('/', rootRoutes);
app.use('/api', apiRoutes);

// serve out or app
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Chat app listening on ", host, port); 
});