import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// ...
@Injectable()
export class LoginService {

constructor(private http: HttpClient) {
    

}

getapi(){
    this.http.get('http://localhost:8000/api/gg').subscribe(response => {
        // Handle successful response
        console.log(response);
      
      });
}

}