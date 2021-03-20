import { Component, OnInit } from "@angular/core";
import { Color } from "src/app/models/color/color";
import { ColorService } from "src/app/services/color/color.service";

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {
//   colors: Color[] = [];
//   currentColor:Color;
//   dataLoaded=false;
//   constructor(private colorService: ColorService) {}

//   ngOnInit(): void {
//     this.getColors();
//   }
//   getColors() {
//     this.colorService.getColors().subscribe((response)=>{
//       this.colors=response.data;
//       this.dataLoaded=true;
//       console.log("Çalışıyor.");
//     })
//   }

//     setCurrentColor(color:Color){this.currentColor=color;}

//     getCurrentColorClass(color:Color){
//       if(color==this.currentColor){return "list-group-item active";}
//       else{return "list-group-item";}
//     }

//   getAllColorClass(){
//     if(!this.currentColor){return "list-group-item active";}
//     else{return "list-group-item";}
// }

//     }

title: string = 'Renkler';
   listAllBrandCss: string = 'text-start list-group-item';
   colors: Color[] = [];
   currentColorId: number = 0;

   constructor(private colorService: ColorService) {
   }

   ngOnInit(): void {
      this.getColors();
   }

   getColors() {
      this.colorService.getColors().subscribe((response) => {
         this.colors = response.data;
      });
   }

   setCurrentColor(colorId: number) {
      this.currentColorId = colorId;
   }

   getCurrentColorClass(colorId: number): string {
      if (this.currentColorId == colorId) {
         return 'list-group-item list-group-item-action active';
      }

      return 'list-group-item list-group-item-action';
   }

   resetCurrentColor(){
      this.currentColorId = 0
   }
}

