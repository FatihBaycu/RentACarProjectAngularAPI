import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from 'src/app/models/brand/brand';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  apiUrl="https://localhost:44342/api/brands/";

  constructor(private httpClient:HttpClient) { }

  getBrands():Observable<ListResponseModel<Brand>>{
    let newPath=this.apiUrl+"getall";
    return this.httpClient.get<ListResponseModel<Brand>>(newPath);
    }

    addBrand(brand:Brand):Observable<ResponseModel>{
      let newPath=this.apiUrl+"addbrand";
      return this.httpClient.post<ResponseModel>(newPath,brand);
    }

    getBrandById(brandId:number):Observable<SingleResponseModel<Brand>>{
      let newPath=this.apiUrl+"getbrandbyid?brandId="+brandId;
      return this.httpClient.get<SingleResponseModel<Brand>>(newPath);
    }

    updateBrand(brand:Brand):Observable<ResponseModel>{
      let newPath=this.apiUrl+"updatebrand";
     return this.httpClient.put<ResponseModel>(newPath,brand);
    }
  }
