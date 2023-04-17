import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from '../../api/product';
import { ProductService } from '../../service/product.service';
import { Subject, Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.scss'],
})
export class DashboardComponent implements OnInit {
    parentSubject: Subject<string> = new Subject();

    ngOnInit(): void {}
    cardAnimation(value: any) {
        this.parentSubject.next(value);
    }
}
