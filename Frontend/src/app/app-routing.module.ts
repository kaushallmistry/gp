import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from './layout/app.layout.component';
import { LandingComponent } from './demo/components/landing/landing.component';
import { RegisterComponent } from './demo/components/register/register.component';

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {   
                    path: '', 
                    component: LandingComponent ,
                },
                {
                    path: 'register',
                    component: RegisterComponent
                },
                {
                    path: '',
                    component: AppLayoutComponent,
                    children: [
                        {
                            path: 'dashboard',
                            loadChildren: () =>
                                import(
                                    './demo/components/dashboard/dashboard.module'
                                ).then((m) => m.DashboardModule),
                        },
                    ],
                },
                {
                    path: 'auth',
                    loadChildren: () =>
                        import('./demo/components/auth/auth.module').then(
                            (m) => m.AuthModule
                        ),
                },

                { path: 'notfound', component: NotfoundComponent },
                { path: '**', redirectTo: '/notfound' },
            ],
            {
                scrollPositionRestoration: 'enabled',
                anchorScrolling: 'enabled',
                onSameUrlNavigation: 'reload',
            }
        ),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
