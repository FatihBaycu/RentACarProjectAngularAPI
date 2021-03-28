import { Component, OnInit } from '@angular/core';
import { RentalService } from 'src/app/services/rental/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(private rentalService:RentalService) { }

  ngOnInit(): void {
    this.getRentableCar();
  }

  getRentableCar(){
    console.log(this.rentalService.getRentingCar());
  }
}
