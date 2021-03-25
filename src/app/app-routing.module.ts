import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalComponent } from './components/rental/rental.component';

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
  { path: 'rentals', component: RentalComponent },
  { path: 'customers', component: CustomerComponent },
  { path: 'cars', component: CarComponent },
  { path: 'cars/detail/:carId', component: CarDetailComponent },
  { path: "cars/filter/:brandId/:colorId",component:CarComponent},
  { path: "rentals/:carId",component:RentalComponent},
  {path:"brands/add",component:BrandAddComponent},
  {path:"colors/add",component:ColorAddComponent},
  {path:"cars/add",component:CarAddComponent},
  // { path: "cars/filter/:colorId",component:CarComponent},
  // { path: "cars/filter/:brandId",component:CarComponent},
  // { path: 'brands/:brandId', component: CarComponent },
  // { path: 'colors/:colorId', component: CarComponent },
  { path: '**',  pathMatch: 'full',component:CarComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
