import { Routes } from '@angular/router';
import { HomeScreenComponent } from './screens/home-screen/home-screen.component';
import { AboutScreenComponent } from './screens/about-screen/about-screen.component';
import { PricingScreenComponent } from './screens/pricing-screen/pricing-screen.component';
import { ContactScreenComponent } from './screens/contact-screen/contact-screen.component';
import { DScreenComponent } from './screens/d-screen/d-screen.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthScreenComponent } from './components/auth-screen/auth-screen.component';
import { authGuard } from './guards/auth.guard';
import { MylistingsComponent } from './components/mylistings/mylistings.component';
import { AlllistingsComponent } from './components/alllistings/alllistings.component';

export const routes: Routes = [
    {path:'',component:HomeScreenComponent},
    {path:'about',component:AboutScreenComponent},
    {path:'pricing',component:PricingScreenComponent},
    {path:'contact',component:ContactScreenComponent},
    {path:"sign",component:AuthScreenComponent},
    {
        path:"dscreen",
        component:DScreenComponent,
        canActivate: [authGuard],
        children:[
            {
                path:'',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                path:'dashboard',
                component:DashboardComponent
            },
            {
                path:'my-listings',
                component:MylistingsComponent
            },
            {
                path:'all-listings',
                component:AlllistingsComponent
            }
        ]
    }
];
