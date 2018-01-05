var express = require('express');
//var angular = require('angular');
var app = express();
app.use(express.static(__dirname )); //__dir and not _dir
var port = 8000; // you can use any port
app.listen(port);
app.get('/', (req, res) => {
    //  console.log(req.params.);
     res.sendFile(__dirname+'/first.html');
})

app.get('/task1', (req,res) => {
    res.sendFile(__dirname+'/index.html');
})

app.get('/task2', (req,res) => {
    res.sendFile(__dirname+'/task2.html');
})

app.get('/task3', (req, res) => {
    res.sendFile(__dirname+'/task3.html');
})
console.log('server listening on :' + port);