import { Component, OnInit } from '@angular/core';
import { RentalDetail } from 'src/app/models/rentalDetail/rentalDetail';
import { LocalStroageService } from 'src/app/services/local-stroage.service';
import { RentalDetailService } from 'src/app/services/rental-detail.service';

@Component({
  selector: 'app-customer-rental',
  templateUrl: './customer-rental.component.html',
  styleUrls: ['./customer-rental.component.css']
})
export class CustomerRentalComponent implements OnInit {
  
  rentalDetails:RentalDetail[];
  customerId:number;
  constructor(private rentalDetailService:RentalDetailService,private localStorageService:LocalStroageService) { }
  ngOnInit(): void {
    this.customerId=this.localStorageService.getCurrentCustomer().customerId;

    this.getRentalDetailsByCustomer(this.customerId);
  }

    getRentalDetailsByCustomer(customerId:number){
      this.rentalDetailService.getRentalDetailsByCustomer(customerId).subscribe(response=>{
        this.rentalDetails=response.data;
        console.log(response.data);
      })
    }
}
