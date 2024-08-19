import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl: string = 'http://localhost:3000/api';
  private tokenKey: string = 'authToken';

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  // employees and admin
  register(username: string, password: string, confirmPassword: string, role: string, salary: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { username, password, role, salary });
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password });
  }

  handleLogin(response: any){
    localStorage.setItem('token', response.token);
    localStorage.setItem('username', response.username);
    localStorage.setItem('role', response.role);
    if(response.role !== 'admin') 
      this.router.navigate([`/users/${response.username}`]);
    else 
      this.router.navigate(['/admin/dashboard']);
  }

  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users`, {
      headers: this.getAuthHeaders(),
    });
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${id}`);
  }

  editUser(id: number, username: string, role: string, salary: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${id}`, { username, role, salary });
  }

  updateUserStatus(userId: number, status: string): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/users/${userId}`, { status });
  }

  // rooms

  getRooms(): Observable<any>{
    return this.http.get(`${this.apiUrl}/rooms`);
  }

  // guests 

  signup(firstName: string, lastName: string, email: string, phoneNumber: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, { firstName, lastName, email, phoneNumber, password });
  }

  // wishlist

  getWishlist(): Observable<any[]>{
    const guestId = this.getLoggedInGuest();
    if(guestId)    
      return this.http.get<any[]>(`${this.apiUrl}/wishlist/${guestId}`);
    else {
      throw new Error('User not Logged In');
    }
  }

  addToWishlist(roomId: number): Observable<any[]>{
    const guestId = this.getLoggedInGuest();
    if(guestId)    
      return this.http.post<any[]>(`${this.apiUrl}/wishlist`,{ guestId, roomId });
    else {
      throw new Error('User not Logged In');
    }
  } 

  // auth tokens
  setToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.tokenKey, token);
    }
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.tokenKey);
    } else {
      return null;
    }
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  getAuthHeaders(): HttpHeaders {
    return new HttpHeaders().set('x-access-token', this.getToken() || '');
  }

  getLoggedInGuest(): number | null {
    const token = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.id;
    }
    return null;
  }
}
