import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';

// const routes: Routes = [
//   {path:"",pathMatch:"full",component:CarComponent},
//   {path:"cars",component:CarComponent},
//   {path:"cars/brand/:brandId",component:CarComponent},
//   {path:"cars/color/:colorId",component:CarComponent},
//   {path:"cars/car/:id",component:CarComponent}


// ];

const routes: Routes = [
  {path:"",pathMatch:"full",component:CarComponent},
  {path:"cars",component:CarDetailComponent},
  {path:"cars/brand/:brandId",component:CarDetailComponent},
  {path:"cars/color/:colorId",component:CarDetailComponent},
  {path:"cars/car/:id",component:CarDetailComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
