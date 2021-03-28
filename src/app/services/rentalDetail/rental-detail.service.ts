import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { Rental } from 'src/app/models/rental/rental';
import { RentalDetail } from 'src/app/models/rentalDetail/rentalDetail';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class RentalDetailService {
  apiUrl = 'https://localhost:44342/api/Rentals/';
  constructor(private httpClient: HttpClient) {}

  getRentalDetails(): Observable<ListResponseModel<RentalDetail>> {
    let newPath=this.apiUrl+"rentalstwo"
    return this.httpClient.get<ListResponseModel<RentalDetail>>(this.apiUrl);
  }

 
}
