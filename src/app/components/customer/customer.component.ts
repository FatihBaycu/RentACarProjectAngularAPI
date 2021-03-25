import { Component, OnInit } from "@angular/core";
import { Customer } from "src/app/models/customer/customer";
import { CustomerDetails } from "src/app/models/customerDetails/customerDetails";
import { CustomerService } from "src/app/services/customer/customer.service";


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customers: Customer[] = [];
  customerDetails:CustomerDetails[]=[];
  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {

  this.getCustomers();
  this.getCustomerDetails();
  }
  getCustomers() {
    this.customerService.getCustomers().subscribe(response=>{
      this.customers=response.data;
    })
  }
    getCustomerDetails(){
      this.customerService.getCustomerDetails().subscribe(response=>{
        this.customerDetails=response.data;
        console.log(response.data);
      })
    }
}
