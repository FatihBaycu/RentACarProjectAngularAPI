import { Injectable } from '@angular/core';
import { Customer } from '../models/customer/customer';

@Injectable({
  providedIn: 'root'
})
export class LocalStroageService {
  
  currentCustomer: string = 'currentCustomer';

      localStorage:Storage;
  //token:string;

  constructor() { 
    this.localStorage=window.localStorage;
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
  setCurrentCustomer(customer:Customer){localStorage.setItem(this.currentCustomer,JSON.stringify(customer));}
  removeCurrentCustomer(){
    localStorage.removeItem(this.currentCustomer);
  }

  
}
