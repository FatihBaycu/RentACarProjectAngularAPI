import { Component, OnInit, ViewChild } from '@angular/core';
import {FormGroup,FormBuilder,FormControl,Validators} from '@angular/forms'
import { BrandService } from 'src/app/services/brand/brand.service';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand/brand';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {

  brandAddForm:FormGroup;
  brands:Brand[];
  
  constructor(
    private formBuilder:FormBuilder,
    private brandService:BrandService,
    private toastrService:ToastrService
  ) { }

  ngOnInit(): void {
    this.createBrandAddForm();
    this.getBrands();
  }

  createBrandAddForm(){
    this.brandAddForm=this.formBuilder.group({
      brandName:["",Validators.required]
    })
  }

    getBrands(){
      this.brandService.getBrands().subscribe(response=>{
        this.brands=response.data;
      })
    }

  BrandAdd(){
    if(this.brandAddForm.valid){
      let brandModel=Object.assign({},this.brandAddForm.value);
      this.brandService.addBrand(brandModel).subscribe((response)=>{
        console.log(brandModel);
        this.toastrService.success("Marka Eklendi.");
            },
            responseError=>{
              if(responseError.error.Errors.length>0){
                console.log(responseError.error.Errors);

                for(let i=0; i<responseError.error.Errors.length; i++){
                  this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama Başarısız");
                }
               
              } 
              else{this.toastrService.error("Formunuz Eksik Dikkat.");}
            }
            )
    }
  }
}


