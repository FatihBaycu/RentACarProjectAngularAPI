import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Brand } from 'src/app/models/brand/brand';
import { Car } from 'src/app/models/car/car';
import { CarDetail } from 'src/app/models/carDetail/carDetail';
import { Color } from 'src/app/models/color/color';
import { BrandService } from 'src/app/services/brand/brand.service';
import { CarService } from 'src/app/services/car/car.service';
import { ColorService } from 'src/app/services/color/color.service';

@Component({
  selector: 'app-car-filter',
  templateUrl: './car-filter.component.html',
  styleUrls: ['./car-filter.component.css']
})
export class CarFilterComponent implements OnInit {
  cars:Car[]=[];
  carDetails:CarDetail[]=[];
  brands:Brand[]=[];
  colors:Color[]=[];

  brandFilter: number;
  colorFilter: number;
  dataLoaded=false;
  currentBrandId:number=0;
  currentColorId:number=0;
  
  constructor(private brandService:BrandService
             ,private colorService:ColorService
              ,private carService:CarService,
              private activatedRoute:ActivatedRoute,
              private _router: Router) { }

  ngOnInit(): void {
   
    
    // this.activatedRoute.queryParams.subscribe((params) => {    
    //     console.log(params['colorId'],params['brandId']);
    //   if (params['colorId'] && params['brandId']) {
    //     this.getCurrentBrandAndColorId( params['brandId'],params['colorId']);
    //   } else if (params['colorId']) {
    //     this.getCurrentColor(params['colorId']);
    //   } else if (params['brandId']) {
    //     this.getCurrentBrand(params['brandId']);
    //   } else {
    //     this.getCars();
    //   }
    // });
   
    this.getBrands();
    this.getColors();
  }

getFilter(brandId:number,colorId:number){
  this._router.navigate(['cars/'], {
    queryParams: { colorId: colorId, brandId: brandId },
  });
}
 

  getCars() {
    this.carService.getCars().subscribe((response) => {
       this.carDetails = response.data;
       this.dataLoaded=true;
    });
 }




  getCurrentBrandAndColorId(brandId:number,colorId:number){
    this.carService.getCarsByBrandAndColorId(brandId,colorId).subscribe((response)=>{
      this.carDetails=response.data;
      this.dataLoaded=true;
      console.log("başladı. colorId:",colorId," brandId:",brandId);
    })
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
       this.brands = response.data;
       this.dataLoaded=true;
    });
  }

 getCurrentBrand(brandId: number) {
    if(this.brandFilter==brandId)
    {return true;}
    else {return false;}
 }
 


 getColors() {
  this.colorService.getColors().subscribe((response) => {
    this.colors = response.data;
    this.dataLoaded = true;
  });
}

getCurrentColor(colorId: number) {
  if(this.colorFilter==colorId){return true}
  else{return false;} 
}




 
}
