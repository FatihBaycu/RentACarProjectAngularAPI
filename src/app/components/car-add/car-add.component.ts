import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand/brand';
import { Car } from 'src/app/models/car/car';
import { Color } from 'src/app/models/color/color';
import { BrandService } from 'src/app/services/brand/brand.service';
import { CarService } from 'src/app/services/car/car.service';
import { ColorService } from 'src/app/services/color/color.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  carAddForm:FormGroup;
  car:Car[];
  colors: Color[];
  brands: Brand[];
  
  constructor(
              private carService:CarService,
              private toastrService:ToastrService,
              private formBuilder:FormBuilder,
              private colorService: ColorService,
              private brandService: BrandService        
              ) { }

  ngOnInit(): void {
    this.getBrands();
    this.getColors();
    this.createAddCarForm();
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }
  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }
    createAddCarForm(){
        this.carAddForm=this.formBuilder.group({
        brandId:["",Validators.required],
        colorId:["",Validators.required],
        modelYear:["",Validators.required],
        dailyPrice:["",Validators.required],
        description:["",Validators.required],
        carName:["",Validators.required],
        carFindexPoint:[""]
      })
    }

    carAdd(){
      if(this.carAddForm.valid){
        let carModel=Object.assign({},this.carAddForm.value);
        carModel.brandId=Number(carModel.brandId);
        carModel.colorId=Number(carModel.colorId);

        this.carService.addCar(carModel).subscribe((response)=>{
          console.log(carModel);
          this.toastrService.success("Araç başarıyla eklendi");
        },
        responseError=>{
          console.log(responseError.error);
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

