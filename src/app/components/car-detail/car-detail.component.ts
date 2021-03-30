import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/carDetail/carDetail';
import { CarImage } from 'src/app/models/carImage/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car/car.service';


@Component({
  selector: 'app-car-detail',
  templateUrl:'./car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

   carDetail: CarDetail;
   carImages: CarImage[] = [];
   imageBaseUrl = "https://localhost:44342/";
   currentImage:CarImage;

   constructor(
      private carService: CarService,
      private activatedRoute: ActivatedRoute,
      private carImageService: CarImageService) {
   }

   ngOnInit(): void {
      this.activatedRoute.params.subscribe((params) => {
         if (params['carId']) {
            this.getPhotosByCarId(params['carId']);
            this.getCarById(params['carId']);
         }
      });
   }

   getCarById(id: number) {
      this.carService.getCarById(id).subscribe((response) => {
         this.carDetail = response.data;
        // console.log(this.carDetail);

      });
   }

   getPhotosByCarId(carId: number) {
      this.carImageService.getImagesByCarId(carId).subscribe((response) => {
         this.carImages = response.data;
      });
   }

   read(url: string){
      console.log(url)
      return url;
   }

   getCurrentImageClass(carImage:CarImage){
      if(this.carImages[0]==carImage){
         return "carousel-item active";
      }
      else {return "carousel-item";
   }

   }
   setCurrentImageClass(carImage:CarImage){
      this.currentImage=carImage;
     }


  }