import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CarService } from 'src/app/services/car/car.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  carAddForm:FormGroup;

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
        })
      }
      else{this.toastrService.error("Hatalı Giriş Yaptınız.");}

      }

  
    }

