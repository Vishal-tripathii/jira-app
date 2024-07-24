import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { HomeComponent } from './components/pages/home/home.component';
import { TaskCardComponent } from './components/partials/task-card/task-card.component';
import { SearchComponent } from './components/partials/search/search.component';
import { TaskPageComponent } from './components/pages/task-page/task-page.component';
import { FilterComponent } from './components/partials/filter/filter.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatDialogModule } from '@angular/material/dialog';
import { TaskFormComponent } from './components/partials/task-form/task-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CreateTaskComponent } from './components/partials/create-task/create-task.component'
import { HttpClientModule } from '@angular/common/http';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { RegisterPageComponent } from './components/partials/register-page/register-page.component';
import { NotFoundComponent } from './components/partials/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    TaskCardComponent,
    SearchComponent,
    TaskPageComponent,
    FilterComponent,
    TaskFormComponent,
    CreateTaskComponent,
    LoginPageComponent,
    RegisterPageComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
