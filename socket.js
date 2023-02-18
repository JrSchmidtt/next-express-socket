import app from './server';
import { Server } from 'socket.io';

const io = new Server(app, {
    cors: {
        origin: '*',
    },
});

io.on('connection', socket => {
    console.log('a user connected on back');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});