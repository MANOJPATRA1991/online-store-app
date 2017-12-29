import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../services/user.service';

@Injectable()
export class ActivateGuard implements CanActivate {

  constructor(private router: Router, private auth: UserService) {}
  loggedIn: boolean = false;
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      this.auth.isLoggedIn.subscribe(value => {
        this.loggedIn = value;
      });
      if(this.loggedIn) {
        return true;
      }else {
        this.router.navigateByUrl('/login');
        return false;
    }
  }
}
