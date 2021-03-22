import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {FormsModule} from '@angular/forms' 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NaviComponent } from './components/navi/navi.component';
import { BrandComponent } from './components/brand/brand.component';
import {HttpClientModule} from '@angular/common/http'
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalComponent } from './components/rental/rental.component';
import { CarComponent } from './components/car/car.component';
import { RentalDetailComponent } from './components/rental-detail/rental-detail.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { FilterTextPipe } from './pipes/filter-text.pipe';
import { VatAddedPipe } from './pipes/vat-added.pipe';
import { BrandPipePipe } from './pipes/brand-pipe.pipe';
import { ColorPipePipe } from './pipes/color-pipe.pipe';
import { CarFilterComponent } from './components/car-filter/car-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    NaviComponent,
    BrandComponent,
    ColorComponent,
    CustomerComponent,
    RentalComponent,
    CarComponent,
    RentalDetailComponent,
    CarDetailComponent,
    FilterTextPipe,
    VatAddedPipe,
    BrandPipePipe,
    ColorPipePipe,
    CarFilterComponent,


  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
  