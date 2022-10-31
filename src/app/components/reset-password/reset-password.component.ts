import { ToastrService } from 'ngx-toastr';
import { Email } from './../../models/email';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  
  constructor(private UserService:UserService,private toastrService:ToastrService) { }

  ngOnInit(): void {
  }

  passwordReset(value:string){
    if(value.length<=0){return this.toastrService.warning("Lüfen alanı doldurun.")}
  return this.UserService.sendPasswordResetMail(value).subscribe((response=>{
    return this.toastrService.success(response.message)

  }));
  }

}
