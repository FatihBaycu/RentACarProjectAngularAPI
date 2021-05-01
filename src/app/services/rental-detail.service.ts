import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { RentalDetail } from 'src/app/models/rentalDetail/rentalDetail';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class RentalDetailService {
  apiUrl=environment.apiUrl+"Rentals/";

  constructor(private httpClient: HttpClient) {}

  getRentalDetails(): Observable<ListResponseModel<RentalDetail>> {
    let newPath=this.apiUrl+"rentalstwo"
    return this.httpClient.get<ListResponseModel<RentalDetail>>(this.apiUrl);
  }

  getRentalDetailsByCustomer(customerId:number): Observable<ListResponseModel<RentalDetail>> {
    let newPath=this.apiUrl+"getrentalsbycustomer?customerId="+customerId;
    return this.httpClient.get<ListResponseModel<RentalDetail>>(newPath);
  }
 
}
