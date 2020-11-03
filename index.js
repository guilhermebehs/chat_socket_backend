var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


let mensagens = [];

let usuarios = {};

app.get('/', function(req, res){
res.send('server is running');
});

io.on("connection", (client)=>{
    usuarios[client.id] = 'Usuário '+Object.keys(usuarios).length+1;
    client.on('enviarMensagem',(texto)=>{
        
        const mensagem = {'usuario':usuarios[client.id],
                          'dataHora': new Date(),
                           'texto': texto} 
        mensagens.push(mensagem)
        
            io.sockets.emit('broadcast', mensagens)
    })
    client.emit("atualizarMensagens", mensagens)

})


http.listen(3001, function(){
console.log('listening on port 3000');
});