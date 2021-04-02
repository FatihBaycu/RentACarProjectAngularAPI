import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { LocalStroageService } from 'src/app/services/local-stroage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup;
  constructor(private formBuilder:FormBuilder,private toastrService:ToastrService,private customerService:CustomerService,private authService:AuthService,private localStorageService:LocalStroageService) { }

  ngOnInit(): void {this.createRegisterForm();}

  createRegisterForm(){
    this.registerForm=this.formBuilder.group({
      firstName:["",Validators.required],
      lastName:["",Validators.required],
      email:["",Validators.required],
      password:["",Validators.required]
    })
  }

  register(){
    if(this.registerForm.valid){
      let registerModel=Object.assign({},this.registerForm.value);

      this.authService.register(registerModel).subscribe(response=>{
        this.toastrService.success(response.message);
        //localStorage.setItem("token",response.data.token);
     },
     responseError=>{
       console.log(responseError);
       this.toastrService.error(responseError.error);
    })
    }
  }
}
