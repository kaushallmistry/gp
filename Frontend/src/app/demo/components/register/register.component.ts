import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  formGroup = new FormGroup({
    username    : new FormControl<string | null>(null,[Validators.required,Validators.email]),
    email       : new FormControl<string | null>(null,[Validators.required,Validators.email]),
    password    : new FormControl<string | null>(null,[Validators.required,Validators.maxLength(50)]),
    confirm_password : new FormControl<string | null>(null,[Validators.required,Validators.maxLength(50)])
  })

  /////////////
  // Extra ///
  ////////////

  onMobile(): boolean {
    return window.innerWidth <= 700;
  }


}
