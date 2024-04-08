import { Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { HomeComponent } from './components/home/home.component';
import { FoodPageComponent } from './components/food-page/food-page.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { MemberAuthGuard } from './services/auth.guard';
import { CheckoutPageComponent } from './components/checkout-page/checkout-page.component';

export const routes: Routes = [
    { path: '', component: HomeComponent ,canActivate:[MemberAuthGuard] },
    { path: 'search/:searchTerm', component: HomeComponent ,canActivate:[MemberAuthGuard] },
    { path: 'tag/:tag', component: HomeComponent,canActivate:[MemberAuthGuard]  },
    {path:'food/:id',component:FoodPageComponent,canActivate:[MemberAuthGuard] },
    {path:'cart-page', component: CartPageComponent,canActivate:[MemberAuthGuard] },
    {path:'checkout', component: CheckoutPageComponent, canActivate:[MemberAuthGuard]},
    {path:'login', loadChildren: ()=> import('./components/login-page/login-page.module').then((m)=>m.LoginPageModule)},
   
];
