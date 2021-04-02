import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer/customer';
import { CustomerDetails } from 'src/app/models/customerDetails/customerDetails';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { LocalStroageService } from 'src/app/services/local-stroage.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userUpdateForm:FormGroup;
  customerDetail:CustomerDetails;
  customer:Customer;
  constructor(private formBuilder:FormBuilder,
    private customerService:CustomerService,
    private toastrService:ToastrService,private localStorageService:LocalStroageService) { }


  ngOnInit(): void {    
      this.customer= this.localStorageService.getCurrentCustomer();
      this.createUserUpdateForm();
      console.log(this.localStorageService.getItem("password"));
    }

  createUserUpdateForm(){
    this.userUpdateForm=this.formBuilder.group({
      firstName:[ this.customer.firstName,Validators.required],
      lastName:[this.customer.lastName,Validators.required],
      email:[this.customer.email,Validators.required],
      password:[this.localStorageService.getItem("password"),Validators.required],
      status:[true,Validators.required]

    })
  }

  userUpdate(){
    if(this.userUpdateForm.valid){
      let userModel=Object.assign({},this.userUpdateForm.value);
      this.customerService.userUpdate(userModel).subscribe(response=>{
        return this.toastrService.success("Güncellendi.")
      })
    }
  }

  getCustomerByEmail(email:string){
    this.customerService.getCustomerByEmail(email).subscribe(response=>{
      this.customerDetail=response.data;
      console.log(response.data);
    })
  }

}
