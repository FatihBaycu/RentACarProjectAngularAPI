import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDetail } from 'src/app/models/carDetail/carDetail';
import { ListResponseModel } from 'src/app/models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarDetailService {
  apiUrl="https://localhost:44342/api";
  constructor(private httpClient:HttpClient) { }
  
  getCarDetail():Observable<ListResponseModel<CarDetail>>{
    return this.httpClient.get<ListResponseModel<CarDetail>>(this.apiUrl);
    }

    getCarsByBrandId(brandId:number):Observable<ListResponseModel<CarDetail>>{
      let newPath=this.apiUrl+"cars/getcarsbybrandid?brandId="+brandId;
      return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }



  getCarsByColorId(colorId:number):Observable<ListResponseModel<CarDetail>>{
    let newPath=this.apiUrl+"cars/getcarsbycolorid?colorId="+colorId;
                                
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
}


}
}
