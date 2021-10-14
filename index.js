import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import redis from 'redis';

import { intervals } from './controlers/intervals.js';
import { get } from './controlers/index.js';
import { NOTICIAS_KEY, PASANTIAS_KEY, TRABAJOS_KEY } from './constants/constants.js';

const PORT = process.env.PORT || 5000

const app = express();
const server = http.createServer(app);
export const io = new Server(server);
export const redisClient = redis.createClient();

dotenv.config()

io.sockets.setMaxListeners(1000);
io.on('connection', (socket) => {
    socket.on('login_noticias', async () => {
      const noticias = await get(NOTICIAS_KEY);
      if(noticias){
        socket.broadcast.to(socket.id).emit('noticias', {noticias : noticias} );
      }
    })

    socket.on('login_pasantias', async () => {
      const pasantias = await get(PASANTIAS_KEY);
      if(pasantias){
        socket.broadcast.to(socket.id).emit('pasantias', {pasantias : pasantias} );
      }
    })

    socket.on('login_trabajos', async () => {
      const trabajos = await get(TRABAJOS_KEY);
      if(trabajos){
        socket.broadcast.to(socket.id).emit('trabajos', {trabajos : trabajos} );
      }
    })
    
    socket.on('disconnect', () => {
        console.log('user disconnected');
      });
  });

(async ()=>{
  await intervals();
})();


server.listen(PORT, () => {
  console.log('listening on *:5000');
});

