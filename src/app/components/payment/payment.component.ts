import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car/car';
import { CarDetail } from 'src/app/models/carDetail/carDetail';
import { CustomerDetails } from 'src/app/models/customerDetails/customerDetails';
import { CarService } from 'src/app/services/car/car.service';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { RentalService } from 'src/app/services/rental/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(private rentalService:RentalService,
    private carService:CarService,
    private activatedRoute:ActivatedRoute,
    private customerService:CustomerService,
    private formBuilder:FormBuilder) { }
  
  cars:CarDetail;
  car:Car[]=[];
  customer:CustomerDetails;
  rentalAddForm:FormGroup;

  ngOnInit(): void {
    this.getRentableCar();
    this.activatedRoute.params.subscribe((params) => {
      if (params['customerId']) {
        this.getCustomerById(params['customerId']);
      }

      if (params['carId']) {
         this.getCarById(params['carId']);
      }
   });
   this.createRentalAddForm();
  }

    
  createRentalAddForm(){
    this.rentalAddForm=this.formBuilder.group({
      firstName:["",Validators.required]
    })
  }

  getRentableCar(){
   // console.log(this.rentalService.getRentingCar());
  }

  getCarById(carId:number){this.carService.getCarById(carId).subscribe((response)=>{this.cars=response.data;console.log(response.data);});}
  getCustomerById(customerId:number){this.customerService.getCustomerById(customerId).subscribe((response)=>{this.customer=response.data;console.log(response.data);})}

  RentalAdd(){}

}
