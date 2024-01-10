import * as  express from 'express';
import * as  http from 'http';
import * as  WebSocket from 'ws';

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });


wss.on('connection', (ws) => {
    ws.on('message', (message: string)=>{
        wss.clients.forEach((client)=>{
            if(client !== ws && client.readyState === WebSocket.OPEN){
                client.send(message);
            }
        });
    });
});

server.listen(3000, ()=>{
    console.log("server is running on 3000");
});