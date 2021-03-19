import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car/car';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarDetailService {
  apiUrl="https://localhost:44342/api/";


  constructor(private httpClient:HttpClient) { }

  getCars():Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl+"cars/getcardetail";
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
    }

    getCarsByBrandId(brandId:number):Observable<ListResponseModel<Car>>{
        let newPath=this.apiUrl+"cars/getcardetailsbybrand?brandId="+brandId;
        return this.httpClient.get<ListResponseModel<Car>>(newPath);
    }

    // getCarDetail(){}

    getCarsByColorId(colorId:number):Observable<ListResponseModel<Car>>{
      let newPath=this.apiUrl+"cars/getcardetailsbycolor?colorId="+colorId;
                                  
      return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  
  }
