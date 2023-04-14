import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { AppLayoutComponent } from 'src/app/layout/app.layout.component';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    @Input() openLoginModal: boolean = false;
    @Output() openLoginModalChange: EventEmitter<boolean> = new EventEmitter();

    constructor(private router: Router) {}

    isBtnLoading: boolean = false;
    loginForm = new FormGroup({
        mobileNo: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
    });
    onSubmit() {
        this.router.navigate(['/dashboard']);
    }
    onClose() {
        this.openLoginModalChange.emit(false);
    }
}
