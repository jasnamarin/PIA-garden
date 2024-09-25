import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:4000/user';

  constructor(private http: HttpClient) {}

  // Login function for both admin and public users
  login(
    username: string,
    password: string
  ): Observable<{ token: string; user: User; message: string }> {
    const loginData = { username, password };
    return this.http.post<{ token: string; user: User; message: string }>(
      `${this.apiUrl}/login`,
      loginData
    );
  }

  // Update user data (can be used for owners and decorators)
  updateUser(userId: string, updates: Partial<any>): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/update-user`,
      {
        userId,
        updates,
      },
      { withCredentials: true }
    );
  }

  // Save the token and role to localStorage
  saveTokenAndUser(token: string, user: User): void {
    localStorage.setItem('token', token); // Store the token
    localStorage.setItem('user', JSON.stringify(user));

    // Decode the token to extract the user's role
    const decodedToken: any = jwtDecode(token); // Decode the token to get the payload
    localStorage.setItem('role', decodedToken.role); // Store the role in localStorage
  }

  // Retrieve the user’s profile data from localStorage
  getUserProfile(): any {
    const userId = localStorage.getItem('userId');
    const role = localStorage.getItem('role');
    return { userId, role };
  }

  getUserData(): Partial<User> {
    const user = localStorage.getItem('user');
    if (!user) {
      console.error('No user data found.');
      return {
        _id: '',
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        gender: 'F', // Default value if gender is missing
        role: 'owner',
        profilePicture: '',
        creditCard: '',
        status: 'pending',
      };
    }

    return JSON.parse(user);
  }

  // Get the user's role
  getRole(): string | null {
    return localStorage.getItem('role'); // Retrieve the role from localStorage
  }

  // Logout function
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
  }
}
