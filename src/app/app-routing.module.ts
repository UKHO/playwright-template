import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormResultsComponent } from './form/form-results.component';
import { MyFormComponent } from './form/my-form.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {path: '', redirectTo: 'welcome', pathMatch: 'full'},
  {path: 'welcome', component: WelcomeComponent},
  {path: 'form', component: MyFormComponent},
  {path: 'form-results', component: FormResultsComponent},
  {path: 'form-results/:isExample', component: FormResultsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
