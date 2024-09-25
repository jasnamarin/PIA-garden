import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Firm } from '../models/firm.model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = 'http://localhost:4000/admin'; // Base URL for the admin routes

  constructor(private http: HttpClient) {}

  // Get all owners
  getAllOwners(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/owners`);
  }

  // Get all decorators
  getAllDecorators(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/decorators`);
  }

  // Get registration requests (pending owners)
  getOwnerRequests(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/registration-requests`);
  }

  getFirms(): Observable<Firm[]> {
    return this.http.get<Firm[]>(`${this.apiUrl}/firms`);
  }

  // Accept owner registration request
  acceptOwnerRequest(userId: string): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/registration-requests/${userId}/accept`,
      {}
    );
  }

  // Decline owner registration request
  declineOwnerRequest(userId: string): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/registration-requests/${userId}/decline`,
      {}
    );
  }

  // Update any user data
  updateUser(userId: string, updates: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/update-user`, {
      userId,
      updates,
    });
  }

  // Add a new decorator
  addDecorator(decorator: Partial<User>): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/add-decorator`, decorator);
  }

  // Add a new firm
  addFirm(firm: Partial<Firm>): Observable<Firm> {
    return this.http.post<Firm>(`${this.apiUrl}/add-firm`, firm);
  }
}
