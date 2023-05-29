import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
interface tokenfetch{
  message:string,
  token: string
}

export interface Cards{
  id:string,
  username:string,
  email:string,
  bio:string,
  avatar:string,
  games:string[]
}
// ...
@Injectable()

export class LoginService {
  token: string | undefined;

constructor(
  private http: HttpClient,
  private cookieService:CookieService
  ) {
    

}

Login(payload:any){
  this.http.post('http://localhost:8000/api/user/login',payload).subscribe((response:any)=> {
      // Handle successful response
      this.token = response.token
      
      if(this.token){
      this.cookieService.set('authToken',this.token);
      this.cookieService.set('refreshToken',response.refreshToken)
      this.cookieService.set('userid',response.payload.id)
      }
      return console.log(response,this.token);
    });
}

Register(payload: any){

  this.http.post('http://localhost:8000/api/user/register',payload).subscribe((response:any)=> {
    
    return console.log(response,this.token);
  });

}

GetListofUser(id:string):Observable<object> {

 return this.http.get(`http://localhost:8000/api/listofusers/${id}`)
 
 
}
getCurrentUser(payload:any): Observable<object>{

  return this.http.post('http://localhost:8000/api/',payload)
}

}