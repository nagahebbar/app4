import { BrowserModule } from '@angular/platform-browser';


import { NgModule } from '@angular/core';
import { FormsModule, FormGroup, FormArray, FormBuilder,
          Validators,ReactiveFormsModule, FormControl } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TopmenuComponent } from './components/topmenu/topmenu.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { ForgotpasswdComponent } from './components/forgotpasswd/forgotpasswd.component';
import { ResetpasswdComponent } from './components/resetpasswd/resetpasswd.component';

import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AccountService } from './services/account.service';

import { FlashMessagesModule } from 'angular2-flash-messages';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './services/auth-guard.service';
import { AuthcompGuard } from './services/auth-compguard.service';
import { SimpleGlobal } from 'ng2-simple-global';

import { TestDirectives } from './directives/test.directive';
import { DataService } from './services/data.service';
import {CurrencyPipe, DecimalPipe, PercentPipe} from '@angular/common';

const routes = [
  { path: '', component: HomeComponent},
  { path: 'register', component: RegisterComponent, canActivate: [AuthcompGuard], data: {       isloggedin: 'ok' } },
  { path: 'resetpasswd', component: ResetpasswdComponent, canActivate: [AuthcompGuard], data: {       isloggedin: 'ok' } },
  { path: 'forgotpasswd', component: ForgotpasswdComponent, canActivate: [AuthcompGuard], data: {       isloggedin: 'ok' } },
  { path: 'login', component: LoginComponent, canActivate: [AuthcompGuard], data: {       isloggedin: 'ok' } },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'transaction', component: TransactionComponent, canActivate: [AuthGuard]},
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TopmenuComponent,
    LoginComponent,
    RegisterComponent,
    ForgotpasswdComponent,
    ResetpasswdComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    TransactionComponent,
    SettingsComponent,
     TestDirectives,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    
    HttpModule,
    FlashMessagesModule.forRoot(),
    RouterModule.forRoot(routes),
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:4202']
      }
    })
  ],
  providers: [AccountService, AuthGuard, AuthcompGuard, SimpleGlobal, DataService, DecimalPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function tokenGetter() {
  return localStorage.getItem('token');
}
