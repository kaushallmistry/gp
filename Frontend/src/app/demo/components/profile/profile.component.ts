import { AfterViewInit, Component,OnDestroy } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { GamesApiService } from '../../service/games-api.service';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
export interface Fruit {
  name: string;
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements AfterViewInit, OnDestroy {

  gamesData=[];

  subs = new Subscription()
  constructor(private gamesApiService:GamesApiService){

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

  formGroup = new FormGroup({
    username: new FormControl( [Validators.required]),
    bio: new FormControl([Validators.required]),
    games: new FormControl([]),
    avater: new FormControl([])
  })

  ngAfterViewInit(): void {

    const subs1= this.gamesApiService.RetriveImages().subscribe(v => {this.gamesData = v.slice(0, 20);})

    this.subs.add(subs1)

  
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
