import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
interface tokenfetch{
  message:string,
  token: string
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

TokenInterceptor(payload:any){
  this.http.post('http://localhost:8000/api/user/login',payload).subscribe((response:any)=> {
      // Handle successful response
      this.token = response.token
      if(this.token){
      this.cookieService.set('authToken',this.token);
      }
      return console.log(response,this.token);
      
    });
}

}