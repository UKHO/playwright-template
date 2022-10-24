import { Component, OnInit } from '@angular/core';
import { WebsocketService } from './websocket-service';

@Component({
  selector: 'app-websocket-page',
  templateUrl: './websocket-page.component.html',
  styleUrls: ['./websocket-page.component.scss']
})
export class WebsocketPageComponent implements OnInit {

  lastmessage: string = '';
  counter: number = 0; 

  constructor(readonly service: WebsocketService) {
    service.subscribe((data) => this.lastmessage = data);
    setInterval(() => {
      this.counter++;
      this.service.sendMessage(`count ${this.counter}`);
    }, 1000);
  }
  
  ngOnInit(): void {
    this.service.sendMessage('Hello');  
  }
}
