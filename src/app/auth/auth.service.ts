import { Injectable } from '@angular/core';
import { ILoginReq, ILoginRes, ILogoutRes } from '.';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login$(payload: ILoginReq): Observable<ILoginRes> {
    const headers = new HttpHeaders().set('remove-token', 'yes');
    return this.http
      .post<ILoginRes>(`${environment.API_URL}login/`, payload, { headers })
      .pipe(
        tap(response => {
          if (response.token) {
            localStorage.setItem('token', response.token);
          }
        })
      );
  }

  logout$(): Observable<ILogoutRes> {
    return this.http.post<ILogoutRes>(`${environment.API_URL}logout/`, {}).pipe(
      tap(res => {
        if (res.status) {
          localStorage.removeItem('token');
        }
      })
    );
  }
}
