import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/models/customer/customer';
import { CustomerDetails } from 'src/app/models/customerDetails/customerDetails';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiUrl="https://localhost:44342/api/customers/";
  currentCustomer:CustomerDetails;
  

  constructor(private httpClient:HttpClient) { }

  getCustomers():Observable<ListResponseModel<Customer>>{
    let newPath=this.apiUrl+"getall";
    return this.httpClient.get<ListResponseModel<Customer>>(newPath);
    }

    getCustomerDetails():Observable<ListResponseModel<CustomerDetails>>{
      let newPath=this.apiUrl+"getcustomerdetails";
      return this.httpClient.get<ListResponseModel<CustomerDetails>>(newPath);
    
    }
    getCustomerById(customerId:number):Observable<SingleResponseModel<CustomerDetails>>{
      let newPath=this.apiUrl+"getcustomerdetailbyid?customerId="+customerId;
      return this.httpClient.get<SingleResponseModel<CustomerDetails>>(newPath);
    }
  
    setCustomer(customer:CustomerDetails){
      this.currentCustomer=customer;
    }

    getCustomer():CustomerDetails{
      return this.currentCustomer;
    }

  }
