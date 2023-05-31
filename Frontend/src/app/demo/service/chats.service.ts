import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatsService {

  constructor(private http: HttpClient) { }

  getConvs(userid:string): Observable<object>{
    return this.http.get(`http://localhost:8000/api/conversations/${userid}`)
  }
}
