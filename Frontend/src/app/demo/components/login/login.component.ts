import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

formGroup = new FormGroup({
  email       : new FormControl(null,[Validators.required,Validators.email]),
  password    : new FormControl(null,[Validators.required,Validators.maxLength(50)])
})

constructor(private service :LoginService){

}

  onSave(){

    console.log(this.service.getapi())
    
  }

}
