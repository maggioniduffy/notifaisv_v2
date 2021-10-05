import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

import { fetchNoticias, fetchPasantias, fetchTrabajos } from './scrappers/faiweb/index.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.json({greetings: "hello there"});
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
      });
  });

setInterval(async () => {
    try { 
        const noticias = await fetchNoticias();
        io.emit('noticias', noticias);
        const pasantias = await fetchPasantias();
        io.emit('pasantias', pasantias);
        const trabajos = await fetchTrabajos();
        io.emit('trabajos', trabajos);
    } catch (error) {
        console.log(error);
    }
}, 100000)

server.listen(3000, () => {
  console.log('listening on *:3000');
});