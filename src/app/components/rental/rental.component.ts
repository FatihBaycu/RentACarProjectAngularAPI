import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car/car';
import { CarDetail } from 'src/app/models/carDetail/carDetail';
import { Customer } from 'src/app/models/customer/customer';
import { CustomerDetails } from 'src/app/models/customerDetails/customerDetails';
import { Rental } from 'src/app/models/rental/rental';
import { ResponseModel } from 'src/app/models/responseModel';
import { CarService } from 'src/app/services/car/car.service';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { RentalService } from 'src/app/services/rental/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
})
export class RentalComponent implements OnInit {
  // cars:Car[];
  // car:Car;
  // customers:Customer[];
  // returnDate:Date;
  // rentDate:Date;
  // customerId:number;

  //constructor(private customerService:CustomerService,private carService:CarService,private activatedRoute:ActivatedRoute){}



  rental: Rental;
  carId: number;
  addRentCarForm: FormGroup;
  currentDate: Date = new Date();

  constructor(private formBuilder: FormBuilder,
              //private localStorageService: LocalStorageService,
              private activatedRoute: ActivatedRoute,
              private toastrService: ToastrService,
              private rentalService: RentalService,
              private router: Router) {
  }

  ngOnInit(): void {
    //this.carId = parseInt(this.activatedRoute.snapshot.paramMap.get("carId"));
    this.createAddRentCarForm();
  }

  createAddRentCarForm() {
     this.addRentCarForm = this.formBuilder.group({
        carId: [this.carId, Validators.required],
        //customerId: [this.localStorageService.getCurrentCustomer().id, Validators.required],
        //customerId: ["this.localStorageService.getCurrentCustomer().id", Validators.required],

        rentDate: ['', [Validators.required]],
        returnDate: ['', Validators.required]
     });
  }

  setRentingCar() {
     if (this.addRentCarForm.invalid) {
        this.toastrService.warning('Alanları kontrol ediniz', 'Dikkat');
        return false;
     }

     this.rental = this.addRentCarForm.value;
     let rentDate = new Date(this.rental.rentDate);
     let returnDate = new Date(this.rental.returnDate);

     if (rentDate < this.currentDate) {
        this.toastrService.warning(
           'Kiralama Tarihi, bu günden sonraki günler olmalıdır', 'Dikkat'
        );
        return false;
     }

     if (returnDate < rentDate || returnDate.getDate() == rentDate.getDate()) {
        this.toastrService.warning(
           'Dönüş Tarihi, kiralama tarihinden sonraki günler olmalıdır', 'Dikkat'
        );
        return false;
     }

     this.rentalService.setRentingCar(this.rental);
     return true;
  }

  checkCarRentable() {
     this.rentalService.getRentalsByCarId(this.carId).subscribe(responseSuccess => {

        if (responseSuccess.data[0] == null) {
           this.setRentingCar();
           return true;
        }

        let lastItem = responseSuccess.data[responseSuccess.data.length - 1];

        if (lastItem.returnDate == null) {
           return this.toastrService.error('Bu araç henüz teslim edilmemiş');
        }

        let returnDate = new Date(lastItem.returnDate);
        this.setRentingCar();

        if (new Date(this.rental.rentDate) < returnDate) {
           this.rentalService.removeRentingCar();
           return this.toastrService.warning(
              'Bu aracı bu tarihler arasında kiralayamazsınız', 'Dikkat'
           );
        }

        this.toastrService.success('Ödeme sayfasına yönlendiriliyorsunuz');
        return this.router.navigate(['/cards']);
     });
  }

 // this.activatedRoute.params.subscribe((params) => {
      //    if (params['brandId']) {
      //       return this.getCarsByBrandId(params['brandId']);
      //    }
      //    if (params['colorId']) {
      //       return this.getCarsByColorId(params['colorId']);
      //    }
      //    return this.getCars();
      // });

      

  // ngOnInit(): void {
  //   this.getCustomers();
  //   this.getCars();
  //   this.activatedRoute.params.subscribe((params)=>{if(params['carId']){return this.getCarById(params['carId']);}})
  // }
  // createRental(){}
  // getReturnMinDate(){}
  // getRentMinDate(){}

  // getCarById(carId:number){this.carService.getCarById(carId).subscribe(response=>{this.car=response.data;})}

  // getCars(){this.carService.getCars().subscribe(response=>{this.cars=response.data; console.log(response.data)})}

  // getCustomers(){
  //   this.customerService.getCustomerDetails().subscribe(response=>{this.customers=response.data;})
  // }
}

