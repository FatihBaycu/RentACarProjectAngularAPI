import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ColorResponeModel } from 'src/app/models/color/colorResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  apiUrl="https://localhost:44342/api/colors/getall";

  constructor(private httpClient:HttpClient) { }

  getColors():Observable<ColorResponeModel>{
    return this.httpClient.get<ColorResponeModel>(this.apiUrl);
    }
  }
