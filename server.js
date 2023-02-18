import express from 'express';
import next from 'next';
import http from 'http';
import { Server } from 'socket.io';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    
    app.use('/api', (req, res) => {
        res.json({ message: 'Hello World' });
    });

    app.get('*', (req, res) => {
        return handle(req, res);
    });

    var server = http.createServer(app);

    server.listen(3000, err => {
        if (err) throw err;
        console.log('> Ready on http://localhost:3000');
    });

    var io = new Server(server, {
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
});