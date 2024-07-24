import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { TaskPageComponent } from './components/pages/task-page/task-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { RegisterPageComponent } from './components/partials/register-page/register-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'search/:searchTerm',
    component: HomeComponent
  },
  {
    path: 'task/:id',
    component: TaskPageComponent
  },
  {
    path: 'tag/:tag',
    component: HomeComponent
  },
  {
    path: 'login-page',
    component: LoginPageComponent
  },
  {
    path: 'register-page',
    component: RegisterPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
