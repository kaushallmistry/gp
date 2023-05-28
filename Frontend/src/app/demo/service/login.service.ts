import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
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

Login(payload:any){
  this.http.post('http://localhost:8000/api/user/login',payload).subscribe((response:any)=> {
      // Handle successful response
      this.token = response.token
      
      if(this.token){
      this.cookieService.set('authToken',this.token);
      this.cookieService.set('refreshToken',response.refreshToken)
      }
      return console.log(response,this.token);
    });
}

Register(payload: any){

  this.http.post('http://localhost:8000/api/user/register',payload).subscribe((response:any)=> {
    
    return console.log(response,this.token);
  });

}

GetListofUser() {

  this.http.get('http://localhost:8000/api/listofusers').subscribe((res)=>{

  return console.log(res)
  })
}

}