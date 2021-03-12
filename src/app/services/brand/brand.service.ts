import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BrandResponeModel } from 'src/app/models/brand/brandResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  apiUrl="https://localhost:44342/api/brands/getall";

  constructor(private httpClient:HttpClient) { }

  getBrands():Observable<BrandResponeModel>{
    return this.httpClient.get<BrandResponeModel>(this.apiUrl);
    }
  }
