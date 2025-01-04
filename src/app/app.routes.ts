import { Routes } from '@angular/router';
import { LoginComponent } from './pages/website/login/login.component';
import { HeaderComponent } from './pages/partials/header/header.component';
import { ButtonComponent } from './shared/button/button.component';
import { FooterComponent } from './pages/partials/footer/footer.component';
import { SignupComponent } from './pages/website/signup/signup.component';
import { HomepageComponent } from './pages/website/homepage/homepage.component';
import { EventsComponent } from './pages/website/events/events.component';
import { ForgetpasswordComponent } from './pages/website/forgetpassword/forgetpassword.component';
import { Header2Component } from './pages/partials/header2/header2.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'login',
        pathMatch:'full'
    },
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'header',
        component:HeaderComponent
    },
    {
        path:'button',
        component: ButtonComponent
    },
    {
        path:'footer',
        component:FooterComponent
    },
    {
        path:'signup',
        component:SignupComponent
    },
    {
        path:'home',
        component:HomepageComponent
    },
    {
        path:'events',
        component:EventsComponent
    },
    {
        path:'forgetpassword',
        component:ForgetpasswordComponent
    },
    {
        path:'header2',
        component:Header2Component
    },
];
