import { AfterViewInit, Component,OnDestroy } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { GamesApiService } from '../../service/games-api.service';
import { Subscription, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../service/Api.service';

export interface Fruit {
  name: string;
}

export interface Profile{
  id:string,
  username:string,
  email:string,
  bio:string,
  avatar:string,
  games:string[]
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements AfterViewInit, OnDestroy {

  gamesData:{title:string; thumbnail:string; id:string}[]=[];

  subs = new Subscription()
  constructor(
    private gamesApiService:GamesApiService,
    public activatedRoute: ActivatedRoute,
    private router: Router,
    private ApiService:ApiService,
    ){

  }
  

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }
  get onMobile(): boolean {
    return window.innerWidth <= 700;
  }

  get onDesktop(): boolean {
    return window.innerWidth > 1280;
  }

 get  onTab(): boolean{
    return window.innerWidth < 1280 && window.innerWidth  > 700;
  }

  set document (doc:Profile){
      
    if(doc == null){
      this.router.navigate(['/'])
    }
    else{

      this.formGroup.setValue({
        avatar:doc?.avatar,
        bio:doc?.bio,
        games:doc.games as any,
        username:doc.username
      })

    }

    this.formGroup.enable()
  }

  formGroup = new FormGroup({
    username: new FormControl<string|null>(null, [Validators.required]),
    bio: new FormControl<string| null>(null,[Validators.required]),
    games: new FormArray ([]),
    avatar: new FormControl<string| null>(null,[])
  })

  ngAfterViewInit(): void {

    const subs1= this.gamesApiService.RetriveImages().subscribe(v => {this.gamesData = v.slice(0, 20);
      console.log(this.gamesData)
    })
    const subs2 = this.activatedRoute.paramMap.pipe(
      map(params => params.get('id')),
      distinctUntilChanged(),
      filter(id => !!id ),
      tap(id=> this.formGroup.disable()),
      switchMap(id =>this.ApiService.getCurrentUser(id as string))
    ).subscribe(v =>{
      console.log()
      this.document = v as Profile})

    this.subs.add(subs1)
    this.subs.add(subs2)

  }



  fruits: Fruit[] = [];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.push({name: value});
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(fruit: Fruit): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }


}

// import { AfterViewInit, Component,OnDestroy } from '@angular/core';
// import { MatChipInputEvent } from '@angular/material/chips';
// import { GamesApiService } from '../../service/games-api.service';
// import { Subscription, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs';
// import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { ApiService } from '../../service/Api.service';

// export interface Fruit {
//   name: string;
// }

// export interface Profile{
//   id:string,
//   username:string,
//   email:string,
//   bio:string,
//   avatar:string,
//   games:string[]
// }
// @Component({
//   selector: 'app-profile',
//   templateUrl: './profile.component.html',
//   styleUrls: ['./profile.component.scss']
// })
// export class ProfileComponent implements AfterViewInit, OnDestroy {

//   gamesData:{title:string; thumbnail:string; id:string}[]=[];

//   subs = new Subscription()
//   constructor(
//     private gamesApiService:GamesApiService,
//     public activatedRoute: ActivatedRoute,
//     private router: Router,
//     private ApiService:ApiService,
//     ){

//   }
  

//   ngOnDestroy(): void {
//     this.subs.unsubscribe()
//   }
//   get onMobile(): boolean {
//     return window.innerWidth <= 700;
//   }

//   get onDesktop(): boolean {
//     return window.innerWidth > 1280;
//   }

//  get  onTab(): boolean{
//     return window.innerWidth < 1280 && window.innerWidth  > 700;
//   }

//   set document (doc:Profile){
      
//     if(doc == null){
//       this.router.navigate(['/'])
//     }
//     else{

//       this.formGroup.setValue({
//         avatar:doc?.avatar,
//         bio:doc?.bio,
//         games:doc.games as any,
//         username:doc.username
//       })

//     }

//     this.formGroup.enable()
//   }

//   formGroup = new FormGroup({
//     username: new FormControl<string|null>(null, [Validators.required]),
//     bio: new FormControl<string| null>(null,[Validators.required]),
//     games: new FormArray ([]),
//     avatar: new FormControl<string| null>(null,[])
//   })

//   ngAfterViewInit(): void {

//     const subs1= this.gamesApiService.RetriveImages().subscribe(v => {this.gamesData = v.slice(0, 20);
//       console.log(this.gamesData)
//     })
//     const subs2 = this.activatedRoute.paramMap.pipe(
//       map(params => params.get('id')),
//       distinctUntilChanged(),
//       filter(id => !!id ),
//       tap(id=> this.formGroup.disable()),
//       switchMap(id =>this.ApiService.getCurrentUser(id as string))
//     ).subscribe(v =>{
//       console.log()
//       this.document = v as Profile})

//     this.subs.add(subs1)
//     this.subs.add(subs2)

//   }



//   fruits: Fruit[] = [];

//   add(event: MatChipInputEvent): void {
//     const value = (event.value || '').trim();

//     // Add our fruit
//     if (value) {
//       this.fruits.push({name: value});
//     }

//     // Clear the input value
//     event.chipInput!.clear();
//   }

//   remove(fruit: Fruit): void {
//     const index = this.fruits.indexOf(fruit);

//     if (index >= 0) {
//       this.fruits.splice(index, 1);
//     }
//   }


// }
