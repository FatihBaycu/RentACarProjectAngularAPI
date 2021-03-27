import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand/brand';
import { BrandService } from 'src/app/services/brand/brand.service';

@Component({
  selector: 'app-brand-details',
  templateUrl: './brand-details.component.html',
  styleUrls: ['./brand-details.component.css']
})
export class BrandDetailsComponent implements OnInit {

  constructor(
    private activatedRoute:ActivatedRoute,
    private brandService:BrandService,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder
  ) { }

  brand!:Brand;
  brandUpdateForm:FormGroup;
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
       this.getBrandById(param['brandId']);
    });
 }

 getBrandById(brandId: number) {
    this.brandService.getBrandById(brandId).subscribe(response => {
       this.brand = response.data;
       this.createBrandUpdateForm();
    });
 }

 createBrandUpdateForm() {
    this.brandUpdateForm = this.formBuilder.group({
       brandId: [this.brand.brandId, Validators.required],
       brandName: [this.brand.brandName, Validators.required],

    });
 }



 brandUpdate() {
    let brand: Brand = this.brandUpdateForm.value

    if (!this.brandUpdateForm.valid) {
       this.toastrService.warning('Lütfen boş bilgi bırakmayın', 'Dikkat');
       return;
    }

    this.brandService.updateBrand(brand).subscribe(responseSuccess => {
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
