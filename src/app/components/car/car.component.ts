import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car/car';
import { CarService } from 'src/app/services/car/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
    cars:Car[]=[];
    dataLoaded=false;
    currentCar:Car;
  constructor(private carService: CarService,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    //this.getCars();
    this.activatedRoute.params.subscribe(params=>{
       if(params["brandId"]){this.getCarsByBrandId(params["brandId"]);} 
        else if(params["colorId"]){this.getCarsByColorId(params["colorId"]);} 
          else{this.getCars();}
    })
  }

  setCurrentCar(car:Car){this.currentCar=car}


  getCars() {
    this.carService.getCars().subscribe(response=>{
      this.dataLoaded=true;
      this.cars=response.data;
    })
  }

  getCarsByColorId(colorId:number){
    console.log("renge göre araba listeleme metotu başladı.");
    this.carService.getCarsByColorId(colorId).subscribe((response)=>{
      this.cars=response.data;
      this.dataLoaded=true;
      console.log("renge göre araba listeleme metotu bitti.");
    })
  }

  getCarsByBrandId(brandId:number){
    console.log("Markaya göre araba listeleme metotu başladıç");
    this.carService.getCarsByBrandId(brandId).subscribe((response)=>{
      this.cars=response.data;
      this.dataLoaded=true;
      console.log("Markaya göre araba listeleme metotu bitti.");
    })
  }

}
