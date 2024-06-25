import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {    

    console.log("TESTING AUTH GUARD", this.authService.isLoggedIn());
    
    if (this.authService.isLoggedIn()) {
      return true; // Allow navigation
    } else {
      this.router.navigate(['/login']); // Redirect to login page
      return false; // Deny navigation
    }
  }
}
