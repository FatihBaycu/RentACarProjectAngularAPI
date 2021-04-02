import { Component,OnInit } from '@angular/core';
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
  
  carDetail:CarDetail;
  rentalAddForm:FormGroup;
  customer:CustomerDetails;
   carId:any;
  ngOnInit(): void {   
    this.customer=this.customerService.getCustomer();
    this.carId=this.activatedRoute.snapshot.paramMap.get('carId');
    this.getCarById(Number(this.carId));
        this.createRentalAddForm();

  }

  createRentalAddForm(){
  
    this.rentalAddForm=this.formBuilder.group({
      carId:[this.carId,Validators.required],
      firstName:[this.customer.firstName,Validators.required],
      brandName:["marka",Validators.required],
      colorName:["renk",Validators.required],
      modelYear:["Yıl",Validators.required],
      description:["açıklama",Validators.required],
      rentDate:["rentDate",Validators.required],
      returnDate:["returnDate",Validators.required]
    })
  }

  getRentableCar(){
   // console.log(this.rentalService.getRentingCar());
  }

  getCarById(carId:number){
    this.carService.getCarById(carId).subscribe((response)=>{
      this.carDetail=response.data;
      console.log(this.customer);
      console.log(this.carDetail);
      
    });}
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
  // getCustomerById(customerId:number){
  //   this.customerService.getCustomerById(10).subscribe((response)=>{
  //     this.customer=response.data;
  //     console.log("Müşteri: "+response.data);
  //   })}
  RentalAdd(){}
}
