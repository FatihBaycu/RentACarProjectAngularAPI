import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car/car';
import { CarDetail } from 'src/app/models/carDetail/carDetail';
import { CarService } from 'src/app/services/car/car.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {

  car!:Car;
  carDetails:CarDetail;
  carUpdateForm:FormGroup;
  constructor(
    private carService:CarService,
    private activatedRoute:ActivatedRoute,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService) { }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
       this.getCarById(param['carId']);
    });
 }

 getCarById(carId: number) {
    this.carService.getCarById(carId).subscribe(response => {
       this.car = response.data;
       this.createCarUpdateForm();
    });
 }

 createCarUpdateForm() {
    this.carUpdateForm = this.formBuilder.group({
       brandId:   [this.car.brandId, Validators.required],
       colorId: [this.car.colorId, Validators.required],
       modelYear: [this.car.modelYear,Validators.required],
       dailyPrice: [this.car.dailyPrice,Validators.required],
       description: [this.car.description],
       carName: [this.car.carName,Validators.required],
    });
 }

  carUpdate() {
    let car: Car = this.carUpdateForm.value

    if (!this.carUpdateForm.valid) {
       this.toastrService.warning('Lütfen boş bilgi bırakmayın', 'Dikkat');
       return;
    }

    this.carService.updateCar(car).subscribe(responseSuccess => {
       return this.toastrService.success(responseSuccess.message, 'Başarılı');
    }, responseError => {
       if (responseError.error.ValidationErrors.length == 0) {
          this.toastrService.error(responseError.error.Message, responseError.error.StatusCode);
          return;
       }

       for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
          this.toastrService.error(
             responseError.error.ValidationErrors[i].ErrorMessage, 'Doğrulama Hatası'
          );
       }
    });
 }
}
