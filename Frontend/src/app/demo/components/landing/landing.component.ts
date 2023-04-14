import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { TieredMenu } from 'primeng/tieredmenu';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
@Component({
    providers: [MessageService],
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {
    openLoginModal: boolean = false;
    openLogin() {
        this.openLoginModal = true;
    }
    openLoginModalChange(event: any) {
        this.openLoginModal = event;
    }
    isBtnLoading: boolean = false;
    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService, private router: Router) {}

    ngOnInit(): void {}
}
