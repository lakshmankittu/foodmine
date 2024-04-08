import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppComponent } from './app.component';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AppRoutingModule } from './app.config';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { InputValidationComponent } from './components/partials/input-validation/input-validation.component';
import { NotFoundComponent } from './components/partials/not-found/not-found.component';
import { SearchComponent } from './components/partials/search/search.component';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { TagsComponent } from './components/partials/tags/tags.component';
import { FoodPageComponent } from './components/food-page/food-page.component';
import { LoginPageRoutingModule } from './components/login-page/login-page-routing.module';
import { LoginPageModule } from './components/login-page/login-page.module';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { LoadingComponent } from './components/partials/loading/loading.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { OrderItemsListComponent } from './components/partials/order-items-list/order-items-list.component';
import { CheckoutPageComponent } from './components/checkout-page/checkout-page.component';


@NgModule({
  declarations: [AppComponent,
    RegisterPageComponent,
    InputValidationComponent,
    NotFoundComponent,
    SearchComponent,
    HeaderComponent,
    HomeComponent,
    TagsComponent,
    FoodPageComponent,
    LoginPageComponent,
    CartPageComponent,
    LoadingComponent,
    OrderItemsListComponent,
    CheckoutPageComponent

],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterLink,
    AppRoutingModule,
    RouterOutlet,
    FormsModule,
    CommonModule,
    LoginPageRoutingModule
  ],
  bootstrap: [AppComponent],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:LoadingInterceptor, multi: true },
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi: true }
  ],
})
export class AppModule { }
