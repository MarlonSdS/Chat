var express = require('express')
var app = express()
var http = require('http').createServer(app)
var io = require('socket.io')(http, {
    cors: {
        origin: "*"
    }
})

var messages = []

io.on("connection", (socket) => {

    console.log(`Conexão estabelecida ${socket.id}`)

    socket.on("disconnect", () =>{
        console.log("X desconectou")
    })

    socket.emit('previousMessages', messages)

    socket.on("sendMessages", (data)=>{

        messages.push(data)
        console.log(data)

        socket.emit('previousMessages', messages)
    })


})

http.listen(3030, () =>{
    console.log("APP RODANDO")
})