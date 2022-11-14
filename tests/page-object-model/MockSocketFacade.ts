import { WebSocket, WebSocketServer } from "ws";

const port = 6789;

export class MockSocketFacade {

    private socketServer!: WebSocketServer;
    private socket!: WebSocket;
    public ReceivedMessages: string[] = [];

    constructor() { }

    public async startServer() {
        this.socketServer = new WebSocketServer({ port: port });

        let resolve: (payload?: unknown) => void
        const promise = new Promise((_resolve) => {
            resolve = _resolve
        })

        //on connection
        this.socketServer.on("connection", async (socket: WebSocket) => {
            console.log('Websocket connected');
            this.socket = socket;

            //when we receive a message
            socket.on("message", async (payload: string) => {

                const myMessage = payload.toString();
                resolve(myMessage);
                console.log("Stub socket recieved: \n" + myMessage);
                this.ReceivedMessages.push(myMessage);
            });

            resolve(socket)
        });
    }

    public stopServer() {
        this.socketServer.close();
    }

    public sendMessage(message: any) {
        let stringifiedMessage = JSON.stringify(message);
        this.socket.send(stringifiedMessage);
        console.log("Stub socket sent: \n" + stringifiedMessage);
    }
}