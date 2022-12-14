import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './auth-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  submitted = false;

  userName = "";
  password = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) {
     }

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted = true;

    this.authService.login(this.userName, this.password);

    if(this.authService.isAuthenticated)
    {
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigateByUrl(returnUrl);
          return;
    }

    this.submitted = false;
  }
}
