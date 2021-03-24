import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/models/car/car';
import { Customer } from 'src/app/models/customer/customer';
import { Rental } from 'src/app/models/rental/rental';
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
  customerId:number;
  rentDate:Date;
  returnDate:Date;
  @Input() car:Car;
  // constructor(private rentalService: RentalService,private customerService:CustomerService) { }
  constructor(private activatedRoute:ActivatedRoute, private router:Router,private customerService:CustomerService,private rentalService:RentalService) { }

  ngOnInit(): void {
    //this.getRentals();
    this.getCustomer();
  }

  
  getCustomer(){
    this.customerService.getCustomers().subscribe((response)=>{
      this.customers=response.data;
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
    let MyRental:Rental = {
      rentDate: this.rentDate,
      returnDate: this.returnDate,
      carId: this.car.id,
      customerId: parseInt(this.customerId.toString())
    }}

  getRentals() {
    this.rentalService.getRentals().subscribe(response=>{
      this.rentals=response.data;
    })
  }

  addRental(){
    this.rentalService.addRental().subscribe((response)=>{
      this.rentals=response.data;
    })
  }
}
