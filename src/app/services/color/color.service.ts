import { HttpClient } from '@angular/common/http';
import { ComponentFactoryResolver, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from 'src/app/models/color/color';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  apiUrl="https://localhost:44342/api/colors/";
  colors:Color[];

  constructor(private httpClient:HttpClient) { }
  
    // "color": [
    //   {
    //     "colorName": "Turuncu"
    //   },
    //   {
    //     "colorName": "Mavi"
    //   }
    // ]
  

  getColors():Observable<ListResponseModel<Color>>{
    let newPath=this.apiUrl+"getall";
    return this.httpClient.get<ListResponseModel<Color>>(newPath);
    }

    addColor(color:Color):Observable<ResponseModel>{
      let newPath=this.apiUrl+"addcolor";
      return this.httpClient.post<ResponseModel>(newPath,color);

    }

    // addColor():Observable<ListResponseModel<Color>>{
    //   let newPath=this.apiUrl+"addcolor";
    //   const color = { 'content-type': 'application/json'}  
    //   const body=JSON.stringify(this.color);
    //   console.log(body);
    //   return this.httpClient.post<ListResponseModel<Color>>(
    //     newPath+"color",body{"color":color   });
    // }
  }
