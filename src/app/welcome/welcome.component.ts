import { Component, OnInit } from '@angular/core';
import { AuthService } from '../login/auth-service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  
  constructor(readonly authService: AuthService) { }

  ngOnInit(): void {
  }

}
