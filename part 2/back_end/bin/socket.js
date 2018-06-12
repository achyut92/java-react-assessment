module.exports = function (io) {
    var clients = []
    io.on('connection', function (socket) {
        socket.on('storeClientInfo', function (data) {
            var clientInfo = new Object();
            clientInfo.customId = data.customId;
            clientInfo.clientId = socket.id;
            if (clients.length > 0) {
                for (var i = 0; i < clients.length; i++) {
                    if (clients[i].customId != clientInfo.customId) {
                        clients.push(clientInfo);
                        break;
                    }
                }
            }else{
                clients.push(clientInfo);
            }
            console.log(clients);
        });

        socket.on('disconnect', function (data) {
            for (var i = 0, len = clients.length; i < len; ++i) {
                var c = clients[i];
                if (c.clientId == socket.id) {
                    clients.splice(i, 1);
                    break;
                }
            }
        });

        socket.on('collectionUpdate', function(data){            
            let clientSockId = data.sockId
            let collectionId = data.collectionId
            console.log('on collectionUpdate '+ clientSockId);
            socket.to(clientSockId).emit('collectionUpdated', {collectionId:collectionId})
        })
        socket.on('collectionDelete', function(data){            
            let clientSockId = data.sockId
            let collectionId = data.collectionId
            console.log('on collectionDelete '+ clientSockId);
            socket.to(clientSockId).emit('collectionDeleted', {collectionId:collectionId})
        })
    });
}
