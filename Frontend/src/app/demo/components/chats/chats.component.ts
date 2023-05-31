import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Message } from 'primeng/api';
import { Subscription, map } from 'rxjs';
import { ApiService } from '../../service/Api.service';
import {  ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent {
  messages: Message[] = [];
  newMessage = '';
  chatHeight = '400px';
  user_name!: string;

  messageControl = new FormControl('',[Validators.required]);

  subs: Subscription = new Subscription();

  constructor( 
    private cookieService:CookieService,
    private ApiService:ApiService,
    public router: ActivatedRoute,
  ){}

  btnDisabled(): boolean {
    return this.messageControl.invalid || !this.messageControl.dirty
  }
  get userid():string{
    return this.cookieService.get("userid")
  }

  get room_id(): string {
    return this.router.snapshot.params['id']
  }

  ngAfterViewInit() {

    const id = this.userid;

    const subs1 = this.ApiService.getCurrentUser(id).subscribe((v)=> {

      this.user_name = v.username

    })

    this.subs.add(subs1)
  }

  onMobile(): boolean {
    return window.innerWidth <= 700;
  }

  sendMessage() {
    const messageControlValue = this.messageControl?.value?.trim();
    
      this.messages.push({
        severity: 'info',
        detail: messageControlValue
      });
      this.messageControl?.setValue('');
      setTimeout(() => {
        this.chatHeight = (parseInt(this.chatHeight, 10) + 40) + 'px';
      }, 0);

      console.log(this.messages)
  }
  
  
}

