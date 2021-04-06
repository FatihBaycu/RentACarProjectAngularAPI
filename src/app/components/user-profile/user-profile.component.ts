import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer/customer';
import { CustomerDetails } from 'src/app/models/customerDetails/customerDetails';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { LocalStroageService } from 'src/app/services/local-stroage.service';
import { UserService } from 'src/app/services/user.service';

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
    private toastrService:ToastrService,
    private localStorageService:LocalStroageService,
    private userService:UserService) { }


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
    })
  }

  userUpdate(){
    if(this.userUpdateForm.valid){
      let userModel=Object.assign({},this.userUpdateForm.value);
      this.userService.updateInfos(userModel).subscribe(response=>{
        return this.toastrService.success("Güncellendi.")
      },
      responseError=>{
        console.log(responseError);
        this.toastrService.error(responseError);
        this.toastrService.error(responseError.error,"Hatalı İşlem");
      }
      )
    }
  }

  getCustomerByEmail(email:string){
    this.customerService.getCustomerByEmail(email).subscribe(response=>{
      this.customerDetail=response.data;
      console.log(response.data);
    })
  }

}
