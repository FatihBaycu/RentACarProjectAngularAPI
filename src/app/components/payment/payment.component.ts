import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car/car';
import { Card } from 'src/app/models/card';
import { CarDetail } from 'src/app/models/carDetail/carDetail';
import { Customer } from 'src/app/models/customer/customer';
import { CustomerDetails } from 'src/app/models/customerDetails/customerDetails';
import { Rental } from 'src/app/models/rental/rental';
import { CarService } from 'src/app/services/car/car.service';
import { CardService } from 'src/app/services/card.service';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { LocalStroageService } from 'src/app/services/local-stroage.service';
import { RentalService } from 'src/app/services/rental/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  carDetail: CarDetail;
  paymentAddForm: FormGroup;
  cardAddForm:FormGroup;
  rental: Rental;
  card:Card;
  saveUsername:boolean;



  constructor(private rentalService: RentalService,
    private carService: CarService,
    private localStorageService: LocalStroageService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    private cardService:CardService
  ) { }

  ngOnInit(): void {
    this.getCurrentRental();
    this.getCarDetailById(this.rentalService.getRentingCar().carId)
    this.createPaymentAddForm();
    
  
  }

   onSaveUsernameChanged(value:boolean){
    this.saveUsername = value;
  
  }

  createPaymentAddForm() {

    this.paymentAddForm = this.formBuilder.group({
      nameOnCard: ["1", Validators.required],
      cardNumber: ["1", Validators.required],
      validDate: ["1", Validators.required],
      cvv: [0, Validators.required],
      customerId:[this.localStorageService.getCurrentCustomer().customerId,Validators.required],
      cardType:["Visa"]
      
    })
    this.card=this.paymentAddForm.value;
    
  }

    cardAdd(){
      if(this.paymentAddForm.valid){
        let cardModel=this.paymentAddForm.value;
        this.cardService.addCard(cardModel).subscribe(responseSuccess=>{
        this.toastrService.success("Kart Bilgileri Eklendi.");
        }, responseError=>{
        console.log("Car Add Hatalı.");
              })

      }
      else{this.toastrService.error("Hatalı Giriş Yaptınız!");}
     
    }

  pay() {
    console.log("Merhaba Dünya");
   
    this.rentalService.addRental(this.rental).subscribe(responseSuccess => {
     if(this.saveUsername==true){this.cardAdd();}
      this.toastrService.success(responseSuccess.message, "Kiralama başarılı")
      this.router.navigate(['/cars']);
    }, responseError => {
      console.log(responseError);
    });
  }

  getCurrentCustomer(): Customer {
    return this.localStorageService.getCurrentCustomer();
  }

  getCurrentRental() {
    this.rental = this.rentalService.getRentingCar();
  }

  calcTotalPrice(): number {
    let rentDate = new Date(this.rental.rentDate)
    let returnDate = new Date(this.rental.returnDate)

    let rangeDay = this.getDiffBetweenDays(returnDate, rentDate)

    let totalPrice = rangeDay * this.carDetail.dailyPrice
    return totalPrice;
  }

  getDiffBetweenDays(rentDate: Date, returnDate: Date) {
    let MsOneDay = 1000 * 60 * 60 * 24;

    let dateOne = Date.UTC(rentDate.getFullYear(), rentDate.getMonth(), rentDate.getDay())
    let dateTwo = Date.UTC(returnDate.getFullYear(), returnDate.getMonth(), returnDate.getDay())

    return Math.floor((dateTwo - dateOne) / MsOneDay)
  }

  getCarDetailById(carId: number) {
    this.carService.getCarById(carId).subscribe(response => {
      this.carDetail = response.data;
      this.calcTotalPrice();
    });
  }
}
