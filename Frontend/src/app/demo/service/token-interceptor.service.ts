import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private cookieService: CookieService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
   const Token =this.cookieService.get('authToken')
    let tokenizedReq = req.clone({
      setHeaders:{
        Authorization: `Bearer ${Token}`
      }
    })
    return next.handle(tokenizedReq)
  }
}
