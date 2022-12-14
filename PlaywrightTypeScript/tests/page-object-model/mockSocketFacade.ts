import { expect } from "@playwright/test";
import { WebSocket, WebSocketServer } from "ws";
import { Utilities } from "./utilities";

const port = 6789;

export class MockSocketFacade {

    private socketServer!: WebSocketServer;
    private socket!: WebSocket;
    private receivedMessages: string[] = [];

    constructor() { }

    public startServer() {
        this.socketServer = new WebSocketServer({ port: port });

        //this is the bit that lets us get into Playwright. 
        //Inspired by https://github.com/kylecoberly/playwright-socket-mocking-example#whats-with-the-weird-promises-thing
        let resolve: (payload?: unknown) => void
        const promise = new Promise((_resolve) => {
            resolve = _resolve
        });

        //on connection
        this.socketServer.on("connection", (socket: WebSocket) => {
            console.log('Websocket connected');
            this.socket = socket;

            //when we receive a message
            socket.on("message", (payload: string) => {
                const myMessage = payload.toString();
                resolve(myMessage);
                console.log("Stub socket recieved: \n" + myMessage);
                this.receivedMessages.push(myMessage);
            });

            resolve(socket)
        });
    }

    public stopServer() {
        this.socket.close();
        this.socketServer.close();
    }

    public sendMessage(message: any) {
        let stringifiedMessage = JSON.stringify(message);
        this.socket.send(stringifiedMessage);
        console.log("Stub socket sent: \n" + stringifiedMessage);
    }

    private hasMessage(message: string): boolean {
        return this.receivedMessages.findIndex(item => item === message) >= 0;
    }

    public async expectToHaveMessage(message: string) {
        await Utilities.waitUntilTrueOrTimeout(async () => this.hasMessage(message));

        expect(this.receivedMessages).toContain(message);
    }
}