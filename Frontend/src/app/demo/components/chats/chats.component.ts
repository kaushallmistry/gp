import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Subscription, debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs';
import { ApiService } from '../../service/Api.service';
import {  ActivatedRoute } from '@angular/router';
import { ChatsService } from '../../service/chats.service';

 interface user{
  _id:string,
  username:string,
  email:string,
  bio:string,
  avatar:string,
  games:string[]
}

interface messages{
  conversationId:string,
  sender:user,
  text:string | undefined
}

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnDestroy ,AfterViewInit {
  messages: messages[] = [];
  newMessage = '';
  chatHeight = '400px';
  user_name!: string;

  messagesSource : any [] = [];
  messageControl = new FormControl('',[Validators.required]);

  subs: Subscription = new Subscription();

  constructor( 
    private cookieService:CookieService,
    private ApiService:ApiService,
    public activatedRoute: ActivatedRoute,
    private chatsService: ChatsService,
    private cd :ChangeDetectorRef
  ){}
  
  fkDocs = new Map<string,any>

  btnDisabled(): boolean {
    return this.messageControl.invalid || !this.messageControl.dirty
  }
  get userid():string{
    return this.cookieService.get("userid")
  }
  conversation_id:string ="";
  
  ngAfterViewInit() {

    console.log("helo")

    const id = this.userid;
    

    const subs1 = this.messageControl.statusChanges.pipe(
      debounceTime(3000)
    ).subscribe(v => this.cd.markForCheck())

    const subs2 = this.activatedRoute.paramMap.pipe(
      map(params => params.get('id')),
      distinctUntilChanged(),
      filter(id => !!id ),
      tap(id=> {if(id)this.conversation_id = id}),
      switchMap(id =>this.ApiService.messagesRetrive(id as string))
    ).subscribe(v =>{
      
      this.messagesSource = v})

    const subs3 = this.ApiService.getCurrentUser(this.userid).subscribe(v => this.fkDocs.set(this.userid,v)) 

    this.subs.add(subs1)
    this.subs.add(subs2)
    this.subs.add(subs3)
  }

  frnd(): any{
    const doc =this.messagesSource.find(v => v.sender._id !== this.userid)
    
    return doc;
  }
  onMobile(): boolean {
    return window.innerWidth <= 700;
  }

  sendMessage() {

    if(this.messageControl.invalid || !this.messageControl.dirty) return;
    const messageControlValue = this.messageControl?.value?.trim();

    const payload ={
      conversationId:this.conversation_id,
        sender:this.fkDocs.get(this.userid),
        text: messageControlValue
    }
      this.messages.push({
        conversationId:this.conversation_id,
        sender:this.fkDocs.get(this.userid),
        text: messageControlValue
      });
      this.messagesSource.push(payload)
      this.messageControl?.setValue('');
      setTimeout(() => {
        this.chatHeight = (parseInt(this.chatHeight, 10) + 40) + 'px';
      }, 0);
      console.log(this.messageControl.value)
      const subs1 = this.chatsService.getSendMessage(payload).subscribe(v => console.log(v))
      
      this.subs.add(subs1)
      console.log(this.messages)
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
  
}

