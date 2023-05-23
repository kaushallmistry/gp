import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../service/login.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

visible: boolean = false;

formGroup = new FormGroup({
  email       : new FormControl<string | null>(null,[Validators.required,Validators.email]),
  password    : new FormControl<string | null>(null,[Validators.required,Validators.maxLength(50)])
})

constructor(
  private service :LoginService,
  private cookieService :CookieService,
  )
  {

}

  onSave(){
    const payload={
      email:this.formGroup.get('email')?.value,
      password: this.formGroup.get('password')?.value
    }
    console.log(this.service.TokenInterceptor(payload))
    
  }

}
