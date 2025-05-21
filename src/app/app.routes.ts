import { Routes } from '@angular/router';
import { HomeScreenComponent } from './screens/home-screen/home-screen.component';
import { AboutScreenComponent } from './screens/about-screen/about-screen.component';
import { PricingScreenComponent } from './screens/pricing-screen/pricing-screen.component';
import { ContactScreenComponent } from './screens/contact-screen/contact-screen.component';

import { DScreenComponent } from './screens/d-screen/d-screen.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthScreenComponent } from './components/auth-screen/auth-screen.component';


export const routes: Routes = [
    {path:'',component:HomeScreenComponent},
    {path:'about',component:AboutScreenComponent},
    {path:'pricing',component:PricingScreenComponent},
    {path:'contact',component:ContactScreenComponent},
    {path:"sign",component:AuthScreenComponent},
    {
        path:"dscreen",
        component:DScreenComponent,
        children:[
            {
                path:'dashboard',
                component:DashboardComponent
            },
        ]
    }
];
