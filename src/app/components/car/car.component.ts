import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/carDetail/carDetail';
import { CarService } from 'src/app/services/car/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})

export class CarComponent implements OnInit {
//     carDetail: CarDetail | undefined;
//     carDetails: CarDetail[] = [];
//   constructor(private carService: CarService,private activatedRoute:ActivatedRoute) { }

  
//    ngOnInit(): void {
//       this.activatedRoute.params.subscribe((params) => {
//          if (params['brandId']) {
//             return this.getCarsByBrandId(params['brandId']);
//          }
//          if (params['colorId']) {
//             return this.getCarsByColorId(params['colorId']);
//          }

//          return this.getCars();
//       });
//    }



//   getCars() {
//     this.carService.getCars().subscribe((response) => {
//        this.carDetails = response.data;
//     });
//  }

//  getCarsByColorId(colorId: number) {
//   this.carService.getCarsByColorId(colorId).subscribe((response) => {
//      this.carDetails = response.data;
//   });
// }

// getCarsByBrandId(brandId: number) {
//   this.carService.getCarsByBrandId(brandId).subscribe((response) => {
//      this.carDetails = response.data;
//   });
// }

// }
   carDetail: CarDetail | undefined;
   carDetails: CarDetail[] = [];

   constructor(private carService: CarService, private activatedRoute: ActivatedRoute) {
   }

   ngOnInit(): void {
      this.activatedRoute.params.subscribe((params) => {
         if (params['brandId']) {
            return this.getCarsByBrandId(params['brandId']);
         }
         if (params['colorId']) {
            return this.getCarsByColorId(params['colorId']);
         }

         return this.getCars();
      });
   }

   getCars() {
      this.carService.getCars().subscribe((response) => {
         this.carDetails = response.data;
      });
   }

   getCarsByBrandId(brandId: number) {
      this.carService.getCarsByBrandId(brandId).subscribe((response) => {
         this.carDetails = response.data;
      });
   }

   getCarsByColorId(colorId: number) {
      this.carService.getCarsByColorId(colorId).subscribe((response) => {
         this.carDetails = response.data;
      });
   }
}
