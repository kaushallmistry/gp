import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from '../../service/login.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { stringify } from 'querystring';
import { FormArray, FormControl, FormGroup } from '@angular/forms';


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



export class DashboardComponent implements AfterViewInit,OnDestroy,OnInit {

    formGroup:FormGroup = new FormGroup({});
    cards:Cards[] = [];
    subs = new Subscription()
    constructor( 
        private loginService:LoginService,
        private cookieService:CookieService
        ){
        
    }
  ngOnInit(): void {
    this.formGroup = new FormGroup({
      swipeLeftCards : new FormArray([]),
      swipeRightCards : new FormArray([]),
    })

  }

    


  ngAfterViewInit(): void {


      //////////////
      //subcriptions
      /////////////

      const userid :string = this.cookieService.get("userid")
      console.log(userid)

    
      const subs1 = this.loginService.GetListofUser(userid).subscribe(v => this.cards = v as Cards[])

      const subs2 = this.formGroup.valueChanges.subscribe(v =>{

        v["swipeLeftCards"].map((v:Cards)=> v)
    
      })
      
      this.subs.add(subs1);
      this.subs.add(subs2);
    }

  ngOnDestroy(): void {
      this.subs.unsubscribe()
  }
  
  get swipedLeftArray () :FormArray{
    return this.formGroup.get('swipeLeftCards') as FormArray 
  }
  get swipedRightArray () :FormArray{
    return this.formGroup.get('swipeRightCards') as FormArray 
  }

    // swipeLeftCards:Cards[] = [];

    // swipeRightCards: Cards[] = [];

  
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

      this.formGroup.updateValueAndValidity();
      console.log("rightCardsForm",this.swipedRightArray.value)
      console.log("LeftCardsForm",this.swipedLeftArray.value)

    }



  }

