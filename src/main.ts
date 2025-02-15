// import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
// import { AppComponent } from './app/app.component';
// import { NgModule } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';
// import { HttpClientModule } from '@angular/common/http';

// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));

// @NgModule({
//   declarations: [
//     // Declare other components here, not AppComponent
//   ],
//   imports: [
//     BrowserModule,
//     FormsModule, // Import FormsModule here
//     RouterModule,
//     HttpClientModule
//   ],
//   providers: []
// })
// export class AppModule { }
import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule, RouterModule.forRoot(routes))
  ]
})
.catch((err) => console.error(err));
