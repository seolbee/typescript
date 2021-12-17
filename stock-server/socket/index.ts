const io = require('socket.io');
module.exports = (server) => {
    let socketServer = io(server);
    socketServer.on('connect', (socket) => {
        socket.on('search', data => {
            
        });
    });
};