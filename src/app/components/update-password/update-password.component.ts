import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ConfirmPasswordResetDto } from './../../models/confirm-password-reset-dto';
import { PasswordChange } from './../../models/passwordChange';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { PasswordResetDto } from './../../models/password-reset-dto';
import { Component, OnInit } from '@angular/core';
import { identifierModuleUrl } from '@angular/compiler';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {


  avaliable: boolean = false;
  confirmPasswordResetDto: ConfirmPasswordResetDto = {} as ConfirmPasswordResetDto;
  passwordResetDto: PasswordResetDto = {} as PasswordResetDto;
  changePasswordForm: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router:Router,
    private userService: UserService) { }


  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['userId'] && params['code']) {
        this.confirmPasswordResetDto.code = params['code'];
        this.confirmPasswordResetDto.userId = params['userId'];
        this.userService.confirmPasswordResetDto(this.confirmPasswordResetDto).subscribe(response => {
          console.log(response.success);
          if (response.success == true) {
            this.createResetPasswordForm();
            this.avaliable = true;
            this.passwordResetDto.code = params['code'];
            this.passwordResetDto.userId = params['userId'];
            this.passwordResetDto.newPassword = "asd";
          }
        });
      }
    });

  }


  createResetPasswordForm() {
    this.changePasswordForm = this.formBuilder.group({
      password: ["", Validators.required],
      rePassword: ["", Validators.required],
    })
  }
  updatePassword() {
    let resetModel = Object.assign({}, this.changePasswordForm.value);
    if (this.changePasswordForm.valid) {
      if (resetModel.password!=resetModel.rePassword) {
        this.toastrService.error("Şifreler Uyuşmuyor.");
      }
      else {
        this.passwordResetDto.code = this.confirmPasswordResetDto.code;
        this.passwordResetDto.userId = this.confirmPasswordResetDto.userId;
        this.passwordResetDto.newPassword = resetModel.password;

        this.authService.passwordReset(this.passwordResetDto).subscribe(
          (response) => {
            this.toastrService.success(response.message);
            return this.router.navigate(['/login']);

            
          },
          responseError => {
            console.log(responseError.error);
            if (responseError.error.Errors.length > 0) {
              console.log(responseError.error.Errors);
              for (let i = 0; i < responseError.error.Errors.length; i++) {
                this.toastrService.error(responseError.error.Errors[i].ErrorMessage, "Doğrulama Başarısız");
              }
            }
          })
      }



    }
  }
}

