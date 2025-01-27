import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { NgModule } from '@angular/core';
import { LoginComponent } from './app/pages/website/login/login.component';
import { FormsModule } from '@angular/forms';
import { Header2Component } from './app/pages/partials/header2/header2.component';
import { RouterModule } from '@angular/router';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

  @NgModule({
    declarations: [
     // Thêm các component của bạn tại đây
    ],
    imports: [
      BrowserModule,
      FormsModule, // Thêm FormsModule vào đây
      RouterModule
    ],
    providers: [],
    bootstrap: []
  })
  export class AppModule { }