import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { FormResultsComponent } from './form/form-results.component';
import { MyFormComponent } from './form/my-form.component';
import { LoginComponent } from './login/login.component';
import { LoginPageGuard } from './login/loginpage.guard';
import { WebsocketPageComponent } from './websocket-page/websocket-page.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {path: '', redirectTo: 'welcome', pathMatch: 'full'},
  {path: 'login', component: LoginComponent, canActivate: [LoginPageGuard]},
  {path: 'welcome', component: WelcomeComponent},
  {path: 'form', component: MyFormComponent, canActivate: [AuthGuard]},
  {path: 'form-results', component: FormResultsComponent, canActivate: [AuthGuard]},
  {path: 'form-results/:isExample', component: FormResultsComponent, canActivate: [AuthGuard]},
  {path: 'websocket-page', component: WebsocketPageComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
