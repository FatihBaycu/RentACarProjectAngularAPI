import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/models/car/car';
import { CarDetail } from 'src/app/models/carDetail/carDetail';
import { Customer } from 'src/app/models/customer/customer';
import { CustomerDetails } from 'src/app/models/customerDetails/customerDetails';
import { Rental } from 'src/app/models/rental/rental';
import { CarService } from 'src/app/services/car/car.service';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { RentalService } from 'src/app/services/rental/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {
  rentals:Rental[]=[];
  customers:Customer[]=[];
  cars:CarDetail[]=[];
  customerDetails:CustomerDetails[]=[];
  customerId:number;
  rentDate:Date;
  returnDate:Date;
  @Input() car:Car;
  // constructor(private rentalService: RentalService,private customerService:CustomerService) { }
  constructor(private activatedRoute:ActivatedRoute,private carService:CarService, private router:Router,private customerService:CustomerService,private rentalService:RentalService) { }

  ngOnInit(): void {
    this.getRentals();
    this.getCustomer();
  }

  getCars(){
    this.carService.getCarsTwo().subscribe((response)=>{
      this.cars=response.data;
      console.log(response.data);

    })
  }
  getCustomer(){
    this.customerService.getCustomerDetails().subscribe((response)=>{
      this.customers=response.data;
      console.log(response.data);
    })
  }

  getRentMinDate(){
    var today  = new Date();
    //min="1980-01-01"
    today.setDate(today.getDate() + 1);
    return today.toISOString().slice(0,10)
  }
  getReturnMinDate(){
    var today  = new Date();
    today.setDate(today.getDate() + 2);
    return today.toISOString().slice(0,10)
  }

  createRental(){
    // let MyRental:Rental = {
    //   rentDate: this.rentDate,
    //   returnDate: this.returnDate,
    //   carId: this.car.id,
    //   customerId: parseInt(this.customerId.toString())
    // }
  
console.log("createRental Çalışıyor.");
}

  getRentals() {
    this.rentalService.getRentals().subscribe(response=>{
      this.rentals=response.data;
      console.log(response.data," getRentals çalışıyor.");
    })
  }

  addRental(){
    this.rentalService.addRental().subscribe((response)=>{
      this.rentals=response.data;
    })
  }
}
