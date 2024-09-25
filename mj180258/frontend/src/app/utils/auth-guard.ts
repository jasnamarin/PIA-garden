import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode'; // For decoding the token

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');

    console.log('auth token: ' + token);

    if (!token) {
      // If no token is found, redirect to login
      this.router.navigate(['/adminlogin']);
      return false;
    }

    // Decode the token to check the user role
    const decodedToken: any = jwtDecode(token);

    if (decodedToken.role === 'admin') {
      return true; // If the user role is admin, grant access
    } else {
      // Redirect non-admin users to login or unauthorized page
      this.router.navigate(['/unauthorized']);
      return false;
    }
  }
}
