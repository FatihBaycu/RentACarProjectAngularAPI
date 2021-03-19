import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/carDetail/carDetail';
import { CarDetailService } from 'src/app/services/carDetails/car-detail.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
    carDetails:CarDetail[]=[];
    dataLoaded=false;


  constructor(private carDetailService:CarDetailService,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.getCarDetails();
    this.activatedRoute.params.subscribe(params=>{
      if(params["brandId"]){this.getCarsByBrandId(params["brandId"]);}
      else if(params["colorId"]){this.getCarsByColorId(params["colorId"]);}
        else{this.getCarDetails();}
    })
  }




  getCarDetails(){
    this.carDetailService.getCarDetail().subscribe(response=>{
      this.carDetails=response.data;
      this.dataLoaded=true;
    })
  }



  getCarsByColorId(colorId:number){
    console.log("renge göre araba listeleme metotu başladı.");
    this.carDetailService.getCarsByColorId(colorId).subscribe((response)=>{
      this.carDetails=response.data;
      this.dataLoaded=true;
      console.log("renge göre araba listeleme metotu bitti.");
    })
  }

  getCarsByBrandId(brandId:number){
    console.log("Markaya göre araba listeleme metotu başladıç");
    this.carDetailService.getCarsByBrandId(brandId).subscribe((response)=>{
      this.carDetails=response.data;
      this.dataLoaded=true;
      console.log("Markaya göre araba listeleme metotu bitti.");
    })
  }


}
