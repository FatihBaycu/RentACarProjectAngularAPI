import { Injectable } from '@angular/core';
import { Customer } from '../models/customer/customer';
import { TokenModel } from '../models/tokenModel';

@Injectable({
  providedIn: 'root'
})
export class LocalStroageService {
  
  currentCustomer: string = 'currentCustomer';
  tokenKey = "token"

  //token:string;

  constructor() { 
  }

  //getItem(key:string):TokenModel{return JSON.parse(localStorage.getItem(key));}

  //setItem(key:string,token:TokenModel){localStorage.setItem(this.token,JSON.stringify(token));}

  //setItem(key:string,tokenModel:TokenModel){localStorage.setItem(key,tokenModel.token);}


  setItem(key:string,value:any){localStorage.setItem(key,value);}
  getItem(key:string){return localStorage.getItem(key);}
  deleteItem(key:string){localStorage.removeItem(key);}
  clear(){localStorage.clear();}

  get isLocalStorageSupported(): boolean {return !!localStorage}

  getCurrentCustomer():Customer{
    return JSON.parse(localStorage.getItem(this.currentCustomer));
  }

  setCurrentCustomer(customer:Customer){
    localStorage.setItem(this.currentCustomer,JSON.stringify(customer));
  }
  
  removeCurrentCustomer(){
    localStorage.removeItem(this.currentCustomer);
  }

  setToken(token: string){
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(){
    return localStorage.getItem(this.tokenKey)
  }

  removeToken(){
    localStorage.removeItem(this.tokenKey)
  }
}
