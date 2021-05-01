import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer/customer';
import { CustomerDetails } from 'src/app/models/customerDetails/customerDetails';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStroageService } from 'src/app/services/local-stroage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userUpdateForm:FormGroup;
  customerUpdateForm:FormGroup;
  passwordChangeForm:FormGroup;
  customerDetail:CustomerDetails;
  customer:Customer;
  total:number=0;
  constructor(private formBuilder:FormBuilder,
    private customerService:CustomerService,
    private toastrService:ToastrService,
    private localStorageService:LocalStroageService,
    private userService:UserService,
    private router:Router,
    private authService:AuthService) { }


  ngOnInit(): void {    
      this.customer= this.localStorageService.getCurrentCustomer();
      this.createUserUpdateForm();
      this.createCustomerUpdateForm();
      this.createPasswordChangeForm();
      
    }

    getCustomerByEmail(email:string){
      this.customerService.getCustomerByEmail(email).subscribe(response=>{
        this.customerDetail=response.data;
        
        console.log(response.data);
      })
    }
  
  /////////////////////////////////////////////////////////////
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
          userModel.id=this.customer.userId;
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
/////////////////////////////////////////////////////////////////
    createCustomerUpdateForm(){
      this.customerUpdateForm=this.formBuilder.group({
        companyName:[this.customer.companyName],
        customerFindexPoint:[this.customer.customerFindexPoint]
      })
    }

    customerUpdate(){
      if(this.customerUpdateForm.valid){
        let customerModel=Object.assign({},this.customerUpdateForm.value);
        customerModel.customerId=this.customer.customerId;
        customerModel.userId=this.customer.userId;
        if(this.total!=0){customerModel.customerFindexPoint=this.total}
        
        this.customerService.customerUpdate(customerModel).subscribe(responseSuccess=>{
          return this.toastrService.success("Güncellendi.");
        },responseError=>{
          this.toastrService.error("Hatalı İşlem");
        })
      }
    }

    calcFindexPoint(min:number=1, max:number=1900) {
      min = Math.ceil(min);
      max = Math.floor(max);
      this.total =Math.floor(Math.random() * (max - min + 1) + min);
      return this.toastrService.success("Findex Puanım: "+this.total);
    }
 ////////////////////////////////////////
      

      createPasswordChangeForm(){
        this.passwordChangeForm=this.formBuilder.group({
          oldPassword:["",Validators.required],
          newPassword:["",Validators.required],
        })
      }

      passwordChange(){
        if(this.passwordChangeForm.valid){
          let passwordChangeModel=Object.assign({},this.passwordChangeForm.value);
          passwordChangeModel.userId=this.customer.userId;
          this.authService.passwordChange(passwordChangeModel).subscribe(responseSuccess=>{
            this.toastrService.success("Parola Değiştirildi.");
          },responseError=>{
            console.log(responseError.error);
            if(responseError.error.Errors.length>0){
              console.log(responseError.error.Errors);
              for(let i=0; i<responseError.error.Errors.length; i++){
                this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Hata");
              }
              }
            }
          );

        }

      }
}
