import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { intervals } from './controlers/intervals.js';
import { getNoticias } from './controlers/noticias.js';

const CONNECTION_URL = process.env.CONNECTION_URL || 'mongodb+srv://faus:Faustino5@cluster0.dvpdv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000

const app = express();
const server = http.createServer(app);
const io = new Server(server);

dotenv.config()

io.on('connection', (socket) => {

    socket.on('login_noticias', () => {
      const noticias = getNoticias();
      if(noticias){
        socket.broadcast.to(socket.id).emit( 'noticias', {noticias : noticias} );
      }
    })
    socket.on('login_pasantias', () => {
      const pasantias = getPasantias();
      if(pasantias){
        socket.broadcast.to(socket.id).emit( 'pasantias', {pasantias : pasantias} );
      }
    })
    socket.on('login_trabajos', () => {
      const trabajos = getTrabajos();
      if(trabajos){
        socket.broadcast.to(socket.id).emit( 'trabajos', {trabajos : trabajos} );
      }
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
      });
  });

intervals(io);

console.log(CONNECTION_URL);
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        server.listen(PORT, () => {
          console.log('listening on *:3000');
        });
    })
    .catch((error) => {
        console.log(error.message)
    });
