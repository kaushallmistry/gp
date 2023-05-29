import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from '../../service/login.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { stringify } from 'querystring';


export interface Cards{
    id:string,
    username:string,
    email:string,
    bio:string,
    avatar:string,
    games:string[]
}

@Component({
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.scss'],
})



export class DashboardComponent implements AfterViewInit,OnDestroy {

    cards:Cards[] = [];
    subs = new Subscription()
    constructor( 
        private loginService:LoginService,
        private cookieService:CookieService
        ){
        
    }

    ngAfterViewInit(): void {


        //////////////
        //subcriptions
        /////////////
        const userid :string = this.cookieService.get("userid")
        console.log(userid)

     
        const subs1 = this.loginService.GetListofUser(userid).subscribe(v => this.cards = v as Cards[])

        this.subs.add(subs1)
    }

   ngOnDestroy(): void {
       this.subs.unsubscribe()
   }
    
    
    swipeLeftCards:Cards[] = [];


    swipeRightCards: Cards[] = [];

  
    drop(event:any) {
        console.log(event)
      if (event.previousContainer === event.container) {
       
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      } else {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex,
        );
      }
    }

  }

