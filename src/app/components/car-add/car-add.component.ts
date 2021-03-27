import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car/car';
import { CarService } from 'src/app/services/car/car.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  carAddForm:FormGroup;
  car:Car[];

  constructor(
              private carService:CarService,
              private toastrService:ToastrService,
              private formBuilder:FormBuilder
              ) { }

  ngOnInit(): void {
    this.createAddCarForm();
  }


    createAddCarForm(){
        this.carAddForm=this.formBuilder.group({
        brandId:["",Validators.required],
        colorId:["",Validators.required],
        modelYear:["",Validators.required],
        dailyPrice:["",Validators.required],
        description:["",Validators.required],
        carName:["",Validators.required]
      })
    }

    carAdd(){
      if(this.carAddForm.valid){
        let carModel=Object.assign({},this.carAddForm.value);
        this.carService.addCar(carModel).subscribe((response)=>{
          console.log(carModel);
          this.toastrService.success("Araç başarıyla eklendi");
        },
        responseError=>{
          if(responseError.error.Errors.length>0){
            console.log(responseError.error.Errors);
            for(let i=0; i<responseError.error.Errors.length; i++){
              this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama Başarısız");
            }
            }
          })
        }
      else{this.toastrService.error("Hatalı Giriş Yaptınız.");}

      }

  
    }

