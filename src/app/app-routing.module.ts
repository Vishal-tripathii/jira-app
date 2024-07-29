import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { TaskPageComponent } from './components/pages/task-page/task-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { RegisterPageComponent } from './components/partials/register-page/register-page.component';
import { AdminPageComponent } from './components/pages/admin-page/admin-page.component';
import { UserSearchComponent } from './components/partials/user-search/user-search.component';
import { UserMenuComponent } from './components/partials/user-menu/user-menu.component';

const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent
  },
  {
    path: 'home-page',
    component: HomeComponent
  },
  {
    path: 'search/:searchTerm',
    component: HomeComponent
  },
  {
    path: 'task/:id/:userType',
    component: TaskPageComponent
  },
  {
    path: 'status/:statusTerm',
    component: HomeComponent
  },
  {
    path: 'login-page',
    component: LoginPageComponent
  },
  {
    path: 'register-page',
    component: RegisterPageComponent
  },
  {
    path: 'admin-page',
    component: AdminPageComponent
  },
  {
    path: 'admin-page/search/:searchTerm',
    component: AdminPageComponent
  },
  {
    path: 'admin-page/status/:statusTerm',
    component: AdminPageComponent
  },
  {
    path: 'search',
    component: UserSearchComponent
  },
  {
    path: 'user-menu/:currentuserId',
    component: UserMenuComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
