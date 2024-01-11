import * as  express from 'express';
import * as  http from 'http';
import * as  WebSocket from 'ws';

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });


wss.on('connection', (ws) => {
    ws.on('message', (message: string)=>{
        console.log(`Message 01: ${message}`);
        wss.clients.forEach((client)=>{
            if( client.readyState === WebSocket.OPEN){
                console.log(`Message 02: ${message}`);
                client.send(message);
                
            }
        });
    });
});

server.listen(3000,'0.0.0.0', ()=>{
    console.log("server is running on 3000");
});