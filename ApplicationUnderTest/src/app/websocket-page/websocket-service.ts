import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from 'src/environments/environment';
  
@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private subject: WebSocketSubject<string>;
  
  constructor() {
    this.subject = webSocket(environment.websocketUrl);
  }

  subscribe(callback: (data: string)=> void){
    this.subject.subscribe({
      next: msg => callback(msg), // Called whenever there is a message from the server.
      error: err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
      complete: () => console.log('complete') // Called when connection is closed (for whatever reason).
    });
  }

  sendMessage(message: string){
    this.subject.next(message);
  }
}