import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import redis from 'redis';

import { intervals } from './controlers/intervals.js';
import { getNoticias } from './controlers/noticias.js';

const PORT = process.env.PORT || 5000

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const redisClient = redis.createClient();

dotenv.config()

io.on('connection', (socket) => {
    socket.on('login_noticias', () => {
      const noticias = getNoticias(redisClient);
      if(noticias){
        socket.broadcast.to(socket.id).emit( 'noticias', {noticias : noticias} );
      }
    })
   /* socket.on('login_pasantias', () => {
      const pasantias = getPasantias(redisClient);
      if(pasantias){
        socket.broadcast.to(socket.id).emit( 'pasantias', {pasantias : pasantias} );
      }
    })
    socket.on('login_trabajos', () => {
      const trabajos = getTrabajos(redisClient);
      if(trabajos){
        socket.broadcast.to(socket.id).emit( 'trabajos', {trabajos : trabajos} );
      }
    })
*/
    socket.on('disconnect', () => {
        console.log('user disconnected');
      });
  });

intervals(io, redisClient);
getNoticias(redisClient);

server.listen(PORT, () => {
  console.log('listening on *:3000');
});

