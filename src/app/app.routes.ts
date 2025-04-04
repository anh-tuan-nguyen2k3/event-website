import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/website/login/login.component';
import { HeaderComponent } from './pages/partials/header/header.component';
import { ButtonComponent } from './shared/button/button.component';
import { FooterComponent } from './pages/partials/footer/footer.component';
import { SignupComponent } from './pages/website/signup/signup.component';
import { HomepageComponent } from './pages/website/homepage/homepage.component';
import { EventsComponent } from './pages/website/events/events.component';
import { ForgetpasswordComponent } from './pages/website/forgetpassword/forgetpassword.component';
import { Header2Component } from './pages/partials/header2/header2.component';
import { EventdetailComponent } from './pages/website/eventdetail/eventdetail.component';
import { PersonalinfoComponent } from './pages/website/personalinfo/personalinfo.component';
import { NgModule } from '@angular/core';
import {  } from '@angular/core';
import { AdminhomeComponent } from './pages/admin/adminhome/adminhome.component';
import { AssociateinfoComponent } from './pages/website/associateinfo/associateinfo.component';
import { FacultyComponent } from './pages/website/faculty/faculty.component';
import { DashboardComponent } from './pages/website/dashboard/dashboard.component';
import { AuthGuard } from './guard/auth.guard';
import { AssociateGuard } from './guard/associate.guard';
import { UserGuard } from './guard/user.guard';
import { ErrorComponent } from './pages/website/404/404.component';



export const routes: Routes = [
    {
        path:'',
        redirectTo:'home',
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
    {
        path:'home',
        component: HomepageComponent
    },
    {
        path:'event-detail/:id',
        component: EventdetailComponent
    },
    {
        path:'personalinfo',
        component: PersonalinfoComponent,
        canActivate: [UserGuard]
    },
    {
        path:'admin',
        component: AdminhomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path:'associateinfo',
        component: AssociateinfoComponent,
        canActivate: [AssociateGuard]
    },
    {
        path:'faculty/:id',
        component: FacultyComponent,
    },
    {
        path:'dashboard',
        component: DashboardComponent
    },
    {
        path:'404',
        component: ErrorComponent,
    }
    
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}

