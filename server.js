var app = require('express')();
var http = require('http').Server(app);

// Listen at 8080 port
var server = app.listen(process.env.PORT || 8080, function () {
  var host = 'localhost' // server.address().address
  var port = server.address().port
  console.log("App listening at http://%s:%s", host, port)
});

var io = require('socket.io').listen(server);

// Static route to show the user interface (index.html)
// at http://localhost:8080/view/index.html.
app.get('/view/*', (req, res) => {
  res.sendFile(req.params[0], {
    root: './src/view/'
  });
});

// Subscribe data from the publisher (view/index.html).
io.on('connection', function(socket){
  socket.on('slide', function(msg){ console.log(msg);
    // Publish data to the subscribers (clients).
    io.emit('slide', msg);
  });
});
