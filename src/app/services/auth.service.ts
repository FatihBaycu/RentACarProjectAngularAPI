import { ResponseModel } from 'src/app/models/responseModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginModel } from '../models/loginModel';
import { PasswordChange } from '../models/passwordChange';
import { RegisterModel } from '../models/registerModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { LocalStroageService } from './local-stroage.service';
import { PasswordResetDto } from '../models/password-reset-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient, private localStorageService: LocalStroageService) { }
  
  apiUrl=environment.apiUrl+"Auth/";



  login(user:LoginModel):Observable<SingleResponseModel<TokenModel>>{
    let newPath=this.apiUrl+"login";
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,user);
  }

  isAuthenticated(): boolean{
    if(this.localStorageService.getToken()){return true;}
    else{return false;}
  }

  register(user:RegisterModel):Observable<SingleResponseModel<RegisterModel>>{
    let newPath=this.apiUrl+"register";
    return this.httpClient.post<SingleResponseModel<RegisterModel>>(newPath,user);
  }

  passwordChange(userPassword:PasswordChange):Observable<SingleResponseModel<PasswordChange>>{
    let newPath=this.apiUrl+"changepassword";
    return this.httpClient.put<SingleResponseModel<PasswordChange>>(newPath,userPassword);
  }


  passwordReset(resetPassword:PasswordResetDto):Observable<ResponseModel>{
    let newPath=this.apiUrl+"password-reset";
    return this.httpClient.post<ResponseModel>(newPath,resetPassword);
  }
}
