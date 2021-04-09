import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandDetailsComponent } from './components/brand-details/brand-details.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorDetailsComponent } from './components/color-details/color-details.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalComponent } from './components/rental/rental.component';
import { PaymentComponent } from './components/payment/payment.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {LoginGuard} from './guards/login.guard';
import {UserProfileComponent} from './components/user-profile/user-profile.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { CustomerRentalComponent } from './components/customer-rental/customer-rental.component';
import { MatSliderModule } from '@angular/material/slider';

// const routes: Routes = [
//   { path: 'rentals', component: RentalComponent },
//   { path: 'customers', component: CustomerComponent },
//   { path: 'cars', component: CarComponent },
//   { path: 'cars/detail/:carId', component: CarDetailComponent },
//   { path: 'brands', component: BrandComponent },
//   { path: 'brands/:brandId', component: BrandComponent },
//   { path: 'colors', component: ColorComponent },
//   { path: 'colors/:colorId', component: ColorComponent },
//   { path: '**', redirectTo: 'cars', pathMatch: 'full' }
// ];



const routes: Routes = [
  { path:'rentals', component: RentalComponent ,canActivate:[LoginGuard]},
  { path:'customers', component: CustomerComponent,canActivate:[LoginGuard]},
  { path:"cars", component: CarComponent },
  { path:'cars/detail/:carId', component: CarDetailComponent },
  { path:"cars/filter/:brandId/:colorId",component:CarComponent},
  { path:'rentals/:carId',component:RentalComponent},
  {path:'brands/add',component:BrandAddComponent,canActivate:[LoginGuard]},
  {path:'colors/add',component:ColorAddComponent,canActivate:[LoginGuard]},
  {path:'cars/add',component:CarAddComponent,canActivate:[LoginGuard]},
  {path:'colors/:colorId',component:ColorDetailsComponent},
  {path:'brands/:brandId',component:BrandDetailsComponent},
  {path:'cars/update/:carId',component:CarUpdateComponent,canActivate:[LoginGuard]},
  {path:'payments',component:PaymentComponent,canActivate:[LoginGuard]},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'user-profile',component:UserProfileComponent,canActivate:[LoginGuard]},
  {path:"password-change",component:ChangePasswordComponent,canActivate:[LoginGuard]},
  {path:"customer-rentals",component:CustomerRentalComponent,canActivate:[LoginGuard]},





  // { path: "cars/filter/:colorId",component:CarComponent},
  // { path: "cars/filter/:brandId",component:CarComponent},
  // { path: 'brands/:brandId', component: CarComponent },
  // { path: 'colors/:colorId', component: CarComponent },


  { path: '**',  pathMatch: 'full',component:CarComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  

})
export class AppRoutingModule { }
