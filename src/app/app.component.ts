import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'SystemUnderTest';
  showPopup: boolean = false;

  ngOnInit(): void {
    this.showPopup = true; //Math.random() < 0.5;
  }

  closePopup(): void {
    this.showPopup = false;
  }

}
