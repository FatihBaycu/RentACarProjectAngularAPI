import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RentalDetailResponseModel } from 'src/app/models/rentalDetail/rentalDetailResponseModel';

@Injectable({
  providedIn: 'root',
})
export class RentalDetailService {
  apiUrl = 'https://localhost:44342/api/Rentals/rentalstwo';
  constructor(private httpClient: HttpClient) {}

  getRentalDetails(): Observable<RentalDetailResponseModel> {
    return this.httpClient.get<RentalDetailResponseModel>(this.apiUrl);
  }
}
