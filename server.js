var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Static route to show the user interface (index.html)
// at http://localhost:3000/view/index.html.
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

// Listen app at 3000 port.
http.listen(3000, function() {
  console.log('listening on *:3000');
});
