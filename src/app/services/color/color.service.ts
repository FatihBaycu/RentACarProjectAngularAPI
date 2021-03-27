import { HttpClient } from '@angular/common/http';
import {Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { Color } from 'src/app/models/color/color';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';

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

    updateColor(color:Color):Observable<ResponseModel>{
      let newPath=this.apiUrl+"updatecolor";
     return this.httpClient.put<ResponseModel>(newPath,color);
    }

    getColorById(colorId:number):Observable<SingleResponseModel<Color>>{
      let newPath=this.apiUrl+"getcolorbyid?colorId="+colorId;
      return this.httpClient.get<SingleResponseModel<Color>>(newPath);
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
