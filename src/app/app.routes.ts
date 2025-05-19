import { Routes } from '@angular/router';
import { HomeScreenComponent } from './screens/home-screen/home-screen.component';
import { AboutScreenComponent } from './screens/about-screen/about-screen.component';
import { PricingScreenComponent } from './screens/pricing-screen/pricing-screen.component';
import { ContactScreenComponent } from './screens/contact-screen/contact-screen.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';


export const routes: Routes = [
    {path:'',component:HomeScreenComponent},
    {path:'about',component:AboutScreenComponent},
    {path:'pricing',component:PricingScreenComponent},
    {path:'contact',component:ContactScreenComponent},
    {path:'login',component:LoginComponent},
    {path:'signup',component:SignupComponent}
];
