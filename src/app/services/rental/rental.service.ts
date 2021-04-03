import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { Rental } from 'src/app/models/rental/rental';
import { ResponseModel } from 'src/app/models/responseModel';

@Injectable({
  providedIn: 'root',
})

export class RentalService {

  apiUrl = 'https://localhost:44342/api/rentals/';
  rentingCar: Rental;

  constructor(private httpClient: HttpClient) {
    this.getRentals();
  }

  getRentals(): Observable<ListResponseModel<Rental>> {
    let newPath = this.apiUrl + 'getall';
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }

  addRental(rental: Rental): Observable<ListResponseModel<Rental>> {
    let newPath = this.apiUrl + 'addrental';
    return this.httpClient.post<ListResponseModel<Rental>>(newPath,rental);
  }

  checkCarStatus(rental: Rental): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'checkcarstatus';
    return this.httpClient.post<ResponseModel>(newPath, rental);
  }

  add(rental: Rental): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'add';
    return this.httpClient.post<ResponseModel>(newPath, rental);
  }

  getRentalsByCarId(carId: number): Observable<ListResponseModel<Rental>> {
    let newPath = this.apiUrl + 'getrentalsbycarid?carId=' + carId;
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }

  getRentalById(rentalId: number): Observable<ListResponseModel<Rental>> {
    let newPath = this.apiUrl + 'getrentalbyid?rentalId=' + rentalId;
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }

  setRentingCar(rental: Rental) {
    this.rentingCar = rental;
  }

  getRentingCar() {
    return this.rentingCar;
  }
}
