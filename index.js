console.log(process.argv);

let port = 6006
let SERVE_UI = true;
for(let arg of process.argv){
    if(arg.indexOf('--port=') !== -1){
        let split = arg.split('=');
        let portNumber = parseInt(split[1]);
        port = portNumber;
    }

    if(arg.indexOf('--no-ui') !== -1){
        SERVE_UI = false;
    }
}

var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http, {
    path: '/sockets'
});
var cors = require('cors')
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
app.use(cors(corsOptions))
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.get('/', (req, res) => res.send('Hello World! get req'))

if(SERVE_UI){
    app.use('/ui', express.static('frontend/hello-world/dist'));
    app.get('/ui', (req, res) => res.sendFile(__dirname + '/frontend/hello-world/dist/index.html'));
}


app.post('/', (req, res) => {
    console.log(req.body.date + ':' + req.body.source + ', tag = ' + req.body.tag + ' (' + req.body.level + ')');
    console.log(req.body.cli_output);
    io.sockets.emit("new-log", req.body);
    return res.send('Hello World!');
});


io.on('connection', function(socket){
    console.log('a user connected');
  });



http.listen(port, () => console.log(`Example app listening on port ${port}!`))
