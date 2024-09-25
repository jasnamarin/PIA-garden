import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PublicInfoService {
  private apiUrl = 'http://localhost:4000';

  constructor(private http: HttpClient) {}

  getLandingPageData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/public-data`);
  }

  getFirms(
    searchName?: string,
    searchAddress?: string,
    sortBy?: string,
    sortOrder?: string
  ): Observable<any> {
    let queryParams = `?sortBy=${sortBy}&sortOrder=${sortOrder}`;
    if (searchName) queryParams += `&searchName=${searchName}`;
    if (searchAddress) queryParams += `&searchAddress=${searchAddress}`;
    return this.http.get<any>(`${this.apiUrl}/firm/firms${queryParams}`);
  }
}
