import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CarDetail } from "src/app/models/carDetail/carDetail";
import { Color } from "src/app/models/color/color";
import { ColorService } from "src/app/services/color/color.service";

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css'],
})
export class ColorComponent implements OnInit {


  dataLoaded = false;
  filterText = "";
  title: string = 'Renkler';
  listAllBrandCss: string = 'text-start list-group-item';
  colors: Color[] = [];
  currentColorId: number = 0;
  carDetails: CarDetail[] = [];

  constructor(private colorService: ColorService, private _router: Router) {}

  ngOnInit(): void {
    this.getColors();
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
      this.dataLoaded = true;
    });
  }
  getFilter(colorId:number){
    this._router.navigate(['cars/'], {
      queryParams: {colorId: colorId },
    });
  }

  setCurrentColor(colorId: number) {
    this.currentColorId = colorId;
  this.getFilter(colorId)
  }

  getCurrentColorClass(colorId: number): string {
    if (this.currentColorId == colorId) {
      return 'list-group-item list-group-item-action active';
    }

    return 'list-group-item list-group-item-action';
  }

  resetCurrentColor() {
    this.currentColorId = 0;
  }
}

