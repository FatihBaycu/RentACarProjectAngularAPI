import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient) { }
  apiUrl = 'https://localhost:44342/api/Auth/';


  login(user:LoginModel):Observable<SingleResponseModel<TokenModel>>{
    let newPath=this.apiUrl+"login";
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,user);
  }

  //isAuthenticated(){if(localStorage.getItem("token")){return true;} else {return false;}}

  isAuthenticated(){
    if(localStorage.getItem("token")){return true;}
    else{return false;}
  }

  register(user:RegisterModel):Observable<SingleResponseModel<RegisterModel>>{
    let newPath=this.apiUrl+"register";
    return this.httpClient.post<SingleResponseModel<RegisterModel>>(newPath,user);
  }

}
