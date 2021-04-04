import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer/customer';
import { CustomerDetails } from 'src/app/models/customerDetails/customerDetails';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { LocalStroageService } from 'src/app/services/local-stroage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  customer:Customer;
  customerDetail:CustomerDetails;
  isAuth:boolean;

  constructor(private formBuilder:FormBuilder,private toastrService:ToastrService,private customerService:CustomerService,private authService:AuthService,private localStorageService:LocalStroageService,private router:Router) { }

  ngOnInit(): void {this.createLoginForm();}

  createLoginForm(){
    this.loginForm=this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required]
    })
  }

  logout(){
    this.localStorageService.setItem("isauth",false);
        localStorage.clear();
        console.log("Çıkış Yapıldı");
        this.router.navigate(['cars'])
        .then(() => {
          window.location.reload();
        });
  }

  isAuthenticated(){}

  login(){

    if(this.loginForm.valid){
      let loginModel=Object.assign({},this.loginForm.value);

      this.authService.login(loginModel).subscribe(response=>{
        this.toastrService.success(response.message);
        this.localStorageService.setItem("password",loginModel.password);
        this.localStorageService.setItem("isauth",true);
        this.localStorageService.setItem("token",response.data.token);
        this.getCustomerByEmail(loginModel.email);
      
        console.log(response.data);
        console.log( this.localStorageService.getItem("isauth"));
        this.router.navigate(['cars'])
        .then(() => {
          window.location.reload();
        });     },
     responseError=>{
       console.log(responseError);
       this.localStorageService.setItem("isauth",false);
       this.toastrService.error(responseError.error)
    })
    }
  }

  getCustomerByEmail(email: string) {
    this.customerService.getCustomerByEmail(email).subscribe(response => {
       this.customerDetail = response.data;
       console.log(response.data.firstName);

       this.localStorageService.setCurrentCustomer(this.customerDetail);
      //       console.log(this.customerDetail);
    });
 }
}