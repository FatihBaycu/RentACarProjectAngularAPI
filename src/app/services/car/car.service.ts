import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarResponeModel } from 'src/app/models/car/carResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl="https://localhost:44342/api/cars/getall";

  constructor(private httpClient:HttpClient) { }

  getCars():Observable<CarResponeModel>{
    return this.httpClient.get<CarResponeModel>(this.apiUrl);
    }
  }
