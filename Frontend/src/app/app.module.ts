import { APP_INITIALIZER, AfterViewInit, NgModule, OnInit } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';

import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { DialogModule } from 'primeng/dialog';
import { PasswordModule } from 'primeng/password';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToastModule } from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuModule } from 'primeng/menu';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ButtonModule } from 'primeng/button';
import { SwipeComponent } from './demo/components/swipe/swipe.component';
import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import { LandingComponent } from './demo/components/landing/landing.component';
import { ToolbarModule } from 'primeng/toolbar';
import { LoginComponent } from './demo/components/login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RegisterComponent } from './demo/components/register/register.component';
import { LoginService } from './demo/service/login.service';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { TokenInterceptorService } from './demo/service/token-interceptor.service';
import { CookieService } from 'ngx-cookie-service';
import { TokenService } from './demo/service/tokenService';
import {DragDropModule} from '@angular/cdk/drag-drop';



@NgModule({
    declarations: [AppComponent, NotfoundComponent, SwipeComponent,LandingComponent,LoginComponent, RegisterComponent],
    imports: [
        CardModule,
        TabViewModule,
        ButtonModule,
        TieredMenuModule,
        MenuModule,
        FormsModule,
        ReactiveFormsModule,
        ToastModule,
        ToggleButtonModule,
        PasswordModule,
        AppRoutingModule,
        AppLayoutModule,
        CommonModule,
        BrowserModule,
        DialogModule,
        ToolbarModule,
        CommonModule,
        ButtonModule,
        CardModule,
        ToolbarModule,
        DialogModule,
        FlexLayoutModule,
        DragDropModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        CountryService,
        CustomerService,
        EventService,
        IconService,
        NodeService,
        PhotoService,
        ProductService,
        LoginService,
        {
            provide:HTTP_INTERCEPTORS,
            useClass:TokenInterceptorService,
            multi:true
        },

    
        
    ],
    bootstrap: [AppComponent],
})
export class AppModule  {

    constructor(
    private cookieService: CookieService,
    private http: HttpClient,
    private tokenService:TokenService
    ){}
    
    
  

}
