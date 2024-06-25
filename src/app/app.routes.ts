import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth-guard.guard';
import { AuthenticatedComponent } from './components/authenticated/authenticated.component';
import { ProductsComponent } from './components/products/products.component';
import { HomeComponent } from './components/home/home.component';


export const routes: Routes = [{
    path: 'login',
    component: LoginComponent
},{
    path: '',
    component: AuthenticatedComponent,
    canActivate: [AuthGuard],
    children:[
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'products',
        component: ProductsComponent
    }]
}];
