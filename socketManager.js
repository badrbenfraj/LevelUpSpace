module.exports = function(socket){
    console.log("Socket Id:" + socket.id);
    console.log(socket)
    socket.on('SEND_MESSAGE', function(data) {
        console.log('new message', data);
        socket.emit('RECEIVE_MESSAGE', data);
    });

    setInterval(function() {
        socket.emit('message', 'Test from server');
    }, 2000);
}