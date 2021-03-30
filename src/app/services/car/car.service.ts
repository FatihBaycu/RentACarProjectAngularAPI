import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from 'src/app/models/car/car';
import { CarDetail } from 'src/app/models/carDetail/carDetail';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl="https://localhost:44342/api/";


  constructor(private httpClient:HttpClient) { }

  getCars():Observable<ListResponseModel<CarDetail>>{
    let newPath=this.apiUrl+"cars/getcardetail";
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
    }

    getCarsTwo():Observable<ListResponseModel<CarDetail>>{
      let newPath=this.apiUrl+"cars/getall";
      return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
      }

    getCarById(carId:number):Observable<SingleResponseModel<CarDetail>>{
      let newPath=this.apiUrl+"cars/getdetailsbycarid?id="+carId;
      return this.httpClient.get<SingleResponseModel<CarDetail>>(newPath);
  }

  

    getCarsByBrandId(brandId:number):Observable<ListResponseModel<CarDetail>>{
        let newPath=this.apiUrl+"cars/getcardetailsbybrand?brandId="+brandId;
        return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
    }

    // getCarDetail(){}

    getCarsByColorId(colorId:number):Observable<ListResponseModel<CarDetail>>{
      let newPath=this.apiUrl+"cars/getcardetailsbycolor?colorId="+colorId;
      return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }
  
    getCarsByBrandAndColorId(brandId:number,colorId:number):Observable<ListResponseModel<CarDetail>>{
      let newPath=this.apiUrl+"cars/getcardetailsbybrandandcolor?brandId="+brandId+"&colorId="+colorId;
      return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
    }

      getCarsDetail():Observable<ListResponseModel<CarDetail>>{
        let newPath=this.apiUrl+"cars/getcardetail";
        return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
      }

        addCar(car:Car):Observable<ResponseModel>{
              let newPath=this.apiUrl+"cars/addcar";
              console.log(car);
              return this.httpClient.post<ResponseModel>(newPath,car);
        }

        updateCar(car:Car):Observable<ResponseModel>{
          let newPath=this.apiUrl+"cars/updatecar";
          return this.httpClient.put<ResponseModel>(newPath,car);
        }
  }
