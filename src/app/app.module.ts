import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ToastrModule} from 'ngx-toastr';
import { FormsModule,ReactiveFormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { NaviComponent } from './components/navi/navi.component';
import { BrandComponent } from './components/brand/brand.component';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
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
import { PaymentComponent } from './components/payment/payment.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { ColorDetailsComponent } from './components/color-details/color-details.component';
import { BrandDetailsComponent } from './components/brand-details/brand-details.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { CustomerRentalComponent } from './components/customer-rental/customer-rental.component';
import { TextStyleDirective } from './directives/text-style.directive';
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
    PaymentComponent,
    ColorAddComponent,
    BrandAddComponent,
    CarAddComponent,
    ColorDetailsComponent,
    BrandDetailsComponent,
    CarUpdateComponent,
    LoginComponent,
    RegisterComponent,
    UserProfileComponent,
    ChangePasswordComponent,
    CustomerRentalComponent,
    TextStyleDirective  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    }),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatPaginatorModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
  