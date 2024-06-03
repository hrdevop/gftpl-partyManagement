import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IAddPartyRes, IPartyRes } from '.';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PartyService {
  constructor(private http: HttpClient) {}

  get$(): Observable<IPartyRes[]> {
    return this.http.get<IPartyRes[]>(`${environment.API_URL}party/`);
  }

  getOne$(id: IPartyRes['id']): Observable<IPartyRes> {
    return this.http.get<IPartyRes>(`${environment.API_URL}party/`, {
      params: { id },
    });
  }

  add$(payload: FormData): Observable<IAddPartyRes> {
    return this.http.post<IAddPartyRes>(
      `${environment.API_URL}party/`,
      payload
    );
  }

  update$(id: IPartyRes['id'], payload: FormData): Observable<IAddPartyRes> {
    return this.http.put<IAddPartyRes>(
      `${environment.API_URL}party/`,
      payload,
      {
        params: { id },
      }
    );
  }

  delete$(id: IPartyRes['id']): Observable<IPartyRes> {
    return this.http.delete<IPartyRes>(`${environment.API_URL}party/`, {
      params: { id },
    });
  }
}
