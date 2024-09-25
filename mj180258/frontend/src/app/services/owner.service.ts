import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OwnerService {
  private apiUrl = 'http://localhost:4000/owner';

  constructor(private http: HttpClient) {}

  // Register a new owner
  registerOwner(newOwner: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register-owner`, newOwner);
  }

  // Get owner profile
  getOwnerProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/profile`);
  }

  // Update owner profile
  updateOwnerProfile(ownerData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/profile`, ownerData);
  }
}
