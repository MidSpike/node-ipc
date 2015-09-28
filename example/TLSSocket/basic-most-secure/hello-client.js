var ipc=require('../../../node-ipc');

/***************************************\
 *
 * You should start both hello and world
 * then you will see them communicating.
 *
 * *************************************/

ipc.config.id   = 'hello';
ipc.config.retry= 1500;
ipc.config.networkHost='localhost';
ipc.config.tls={
    private: '../../../local-node-ipc-certs/private/client.key',
    public: '../../../local-node-ipc-certs/client.pub',
    rejectUnauthorized:true,
    trustedConnections: [
        '../../../local-node-ipc-certs/server.pub'
    ]
};

ipc.connectToNet(
    'world',
    function(){
        ipc.of.world.on(
            'connect',
            function(){
                ipc.log('## connected to world ##'.rainbow, ipc.config.delay);
                ipc.of.world.emit(
                    'message',
                    'hello'
                )
            }
        );
        ipc.of.world.on(
            'disconnect',
            function(){
                ipc.log('disconnected from world'.notice);
            }
        );
        ipc.of.world.on(
            'message',
            function(data){
                ipc.log('got a message from world : '.debug, data);
            }
        );
    }
);
