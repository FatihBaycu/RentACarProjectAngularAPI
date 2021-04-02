import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color/color';
import { ColorService } from 'src/app/services/color/color.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {

  colorAddForm:FormGroup;
  colors:Color[];
  constructor(private formBuilder:FormBuilder,
    private colorService:ColorService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createColorAddForm();
    this.getColors();
  }

  createColorAddForm(){
    this.colorAddForm=this.formBuilder.group({
      colorName:["",Validators.required],
      colorCode:[""]
    })
  }

  colorAdd(){
    if(this.colorAddForm.valid){
      let colorModel=Object.assign({},this.colorAddForm.value);
      this.colorService.addColor(colorModel).subscribe(response=>{
        console.log(colorModel);
        this.toastrService.success("Renk Eklendi");
      },
      responseError=>{
        if (responseError.error.Errors.length>0) {
          console.log(responseError.error.Errors);
      for (let i = 0; i <responseError.error.Errors.length; i++) {

                this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama Başarısız.");
              }
              }
            })
          }
        else{this.toastrService.error("Hatalı Giriş Yaptınız.")}

      }


        getColors(){
            this.colorService.getColors().subscribe(response=>{
            this.colors=response.data;
            console.log(response.data);
          })
        }
    
  // colorAdd(){
  //   if(this.colorAddForm.valid){
  //   let colorModel=Object.assign({},this.colorAddForm.value);
  //   this.colorService.addColor(colorModel).subscribe(response=>{
  //       console.log(colorModel);
  //     this.toastrService.success(response.message,"Başarılı");
  //   },
  //   responseError=>{
  //     if(responseError.error.Errors.length>0){
  //     console.log(responseError.error.Errors)

  //     for (let i = 0; i <responseError.error.Errors.length; i++) {
  //       this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama Başarısız.");
  //       }
  //     }
  //   })
  // }
  // else {
  //   this.toastrService.error("Formunuz eksik,dikkat");
  // }
  //   console.log(colorModel);
  // }  
   
  }
 
