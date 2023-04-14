import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss']
})
export class LandingComponent {

    showContent: boolean = false;
    visible: boolean = false;

    constructor(public layoutService: LayoutService, public router: Router) {}


    ngAfterViewInit(): void {
        setTimeout(() => {
          this.showContent = true;
        }, 1500);
      }

    ////////////////////
    /////extra./////////
    ////////////////////

    showDialog() {
      this.visible = true;
    }
    onMobile(): boolean {
        return window.innerWidth <= 700;
    }


}

