import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color/color';
import { ColorService } from 'src/app/services/color/color.service';

@Component({
  selector: 'app-color-details',
  templateUrl: './color-details.component.html',
  styleUrls: ['./color-details.component.css']
})
export class ColorDetailsComponent implements OnInit {
  color!:Color;
  colorUpdateForm:FormGroup;
  constructor(
    private colorService:ColorService,
    private activatedRoute:ActivatedRoute,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService) { }
 
  // ngOnInit(): void {
    

  //   this.activatedRoute.params.subscribe((params)=>{
     
  //       this.getColorById(params['colorId']);
            
  //   });
  // }//değil

 
  // createColorUpdateForm(){
  //   this.colorUpdateForm=this.formBuilder.group({
  //     colorId:[this.activatedRoute.snapshot.paramMap.get('colorId'),Validators.required],
  //     colorName:[this.color.colorName,Validators.required],
  //     colorCode:[this.color.colorCode]
  //   })
  // }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
       this.getColorById(param['colorId']);
    });
 }

 getColorById(colorId: number) {
    this.colorService.getColorById(colorId).subscribe(response => {
       this.color = response.data;
       this.createColorUpdateForm();
    });
 }

 createColorUpdateForm() {
    this.colorUpdateForm = this.formBuilder.group({
       colorId:   [this.color.colorId, Validators.required],
       colorName: [this.color.colorName, Validators.required],
       colorCode: [this.color.colorCode]

    });
 }



  colorUpdate() {
    let color: Color = this.colorUpdateForm.value

    if (!this.colorUpdateForm.valid) {
       this.toastrService.warning('Lütfen boş bilgi bırakmayın', 'Dikkat');
       return;
    }

    this.colorService.updateColor(color).subscribe(responseSuccess => {
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








  // colorUpdate(){
  //   if(this.colorUpdateForm.valid){
      
  //     let colorModel=Object.assign({},this.colorUpdateForm.value);
  //     colorModel.colorId=parseInt(colorModel.colorId);

  //     this.colorService.updateColor(colorModel).subscribe(response=>{
  //       //console.log(colorModel);
      
  //       this.toastrService.success("Renk Güncellendi.");
  //     },
  //     responseError=>{
  //       if (responseError.error.Errors.length>0) {
  //        // console.log(responseError.error.Errors);
  //     for (let i = 0; i <responseError.error.Errors.length; i++) {

  //               this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama Başarısız.");
  //             }
  //             }
  //           })
  //         }
  //       else{this.toastrService.error("Hatalı Giriş Yaptınız.")}

  //     }

  // colorUpdate(){
  //   console.log(this.colorUpdateForm.value);
  // }

  // getColorById(colorId:number){
  //   this.colorService.getColorById(colorId).subscribe(response=>{
  //     this.color=response.data;
  //     //console.log(this.color);
  //     this.createColorUpdateForm();

  //   })

  // }
}
