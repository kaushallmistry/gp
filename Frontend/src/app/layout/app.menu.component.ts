import { AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { ChatsService } from '../demo/service/chats.service';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';


@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements AfterViewInit,OnDestroy {
    model: any[] = [];
    converstions: any[] = [];

    subs = new Subscription()

    constructor(
        public layoutService: LayoutService,
        private chatsService: ChatsService,
        private cookieService:CookieService
    ) {}
    ngOnDestroy(): void {
      this.subs.unsubscribe()
    }
    get userid():string{
        return this.cookieService.get("userid")
      }
    
    ngAfterViewInit(): void {
        
        const subs1 = this.chatsService.getConvs(this.userid).subscribe((v)=>console.log(v))
        
        
    }
    
    // this.model = [
    //     {
    //         items: [
    //             {
    //                 label: 'Dashboard',
    //                 icon: 'pi pi-fw pi-home',
    //                 routerLink: ['/dashboard'],
    //             },
                
    //         ],
    //     },
    // ];





}
