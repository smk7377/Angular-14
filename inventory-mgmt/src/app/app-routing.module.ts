import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddproductComponent } from './addproduct/addproduct.component';
import { DiscountComponent } from './discount/discount.component';
import { AuthorizationGuard } from './guards/authorization.guard';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ResetpasswordComponent } from './pages/resetpassword/resetpassword.component';
import { SignupComponent } from './pages/signup/signup.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',    
  },
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    pathMatch: 'full',    
    canActivate : [AuthorizationGuard]    
  },
  {
    path: 'discount',
    component: DiscountComponent,
    pathMatch: 'full',    
    canActivate : [AuthorizationGuard],
    data: {
      role: 'salesmanager'
    }
  },
  {
    path: 'signup',
    component: SignupComponent,
    pathMatch: 'full',
    canActivate : [AuthorizationGuard]
  },
  {
    path: 'resetpassword',
    component: ResetpasswordComponent,
    pathMatch: 'full',
    canActivate : [AuthorizationGuard]
  },
  {
    path: 'addproduct',
    component: AddproductComponent,
    pathMatch: 'full',
    canActivate : [AuthorizationGuard],
    data: {
      role: 'admin'
    }
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes , {  onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
