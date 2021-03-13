import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDetailResponeModel } from 'src/app/models/carDetail/carDetailResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarDetailService {
  apiUrl="https://localhost:44342/api/Cars/getcardetail";
  constructor(private httpClient:HttpClient) { }
  
  getCarDetail():Observable<CarDetailResponeModel>{
    return this.httpClient.get<CarDetailResponeModel>(this.apiUrl);
    }
}
