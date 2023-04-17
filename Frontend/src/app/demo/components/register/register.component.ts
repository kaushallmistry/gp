import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  formGroup = new FormGroup({
    email       : new FormControl(null,[Validators.required,Validators.email]),
    password    : new FormControl(null,[Validators.required,Validators.maxLength(50)])
  })

}
