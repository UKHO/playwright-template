import { Component, OnInit } from '@angular/core';
import { WebsocketService } from './websocket-service';

@Component({
  selector: 'app-websocket-page',
  templateUrl: './websocket-page.component.html',
  styleUrls: ['./websocket-page.component.scss']
})
export class WebsocketPageComponent implements OnInit {

  constructor(readonly service: WebsocketService) {
    
  }

  ngOnInit(): void {
    
  }

  ngDoCheck(): void {
  //  this.service.sendMessage('Hello');
  }

}
