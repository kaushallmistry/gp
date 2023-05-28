import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { TokenService } from './tokenService';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  isTokenExpired: boolean | undefined;
  constructor(
    private cookieService: CookieService,
    ) { }


  intercept(req: HttpRequest<any>, next: HttpHandler) {
    
    const Token =this.cookieService.get('authToken')

      if(req.url.endsWith("refresh-token")){
       
        const refreshToken = this.cookieService.get('refreshToken')
        let tokenizedReq = req.clone({
          setHeaders:{
            Authorization: `Bearer ${refreshToken}`}
          })
        
        return next.handle(tokenizedReq)
      }
      let tokenizedReq = req.clone({
        setHeaders:{
          Authorization: `Bearer ${Token}`
        }
      })
      return next.handle(tokenizedReq)
      
  }
}
