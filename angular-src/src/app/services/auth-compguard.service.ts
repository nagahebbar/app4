import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AccountService } from './account.service';

@Injectable()
export class AuthcompGuard implements CanActivate {

constructor(private accountService: AccountService, private router: Router) {}

canActivate(route: ActivatedRouteSnapshot): boolean {
   
    const isloggedin = route.data.isloggedin;
    
   
    
    if ("ok" === isloggedin && this.accountService.isUserLoggedin()) {
       this.router.navigateByUrl('/dashboard');
      return false;
    }
    return true;
  }
}