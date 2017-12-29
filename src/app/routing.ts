import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './components/user/signup/signup.component';
import { LoginComponent } from './components/user/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { ActivateGuard } from './guards/activate.guard';
import { DeactivateGuard } from './guards/deactivate.guard';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'signup',
        component: SignupComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [ActivateGuard]
    }
];

export const routing = RouterModule.forRoot(routes);