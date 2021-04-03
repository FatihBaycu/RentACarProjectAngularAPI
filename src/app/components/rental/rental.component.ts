import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer/customer';
import { Rental } from 'src/app/models/rental/rental';
import { LocalStroageService } from 'src/app/services/local-stroage.service';
import { RentalService } from 'src/app/services/rental/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
})
export class RentalComponent implements OnInit {

  rental: Rental;
  carId: number;
  addRentCarForm: FormGroup;
  currentDate: Date = new Date();

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private rentalService: RentalService,
    private router: Router,
    private localStorageService: LocalStroageService
  ) { }

  ngOnInit(): void {
    this.carId = Number(this.activatedRoute.snapshot.paramMap.get('carId'));
    localStorage.setItem("carId", String(this.activatedRoute.snapshot.paramMap.get('carId')));
    this.createAddRentCarForm();
  }

  createAddRentCarForm() {
    this.addRentCarForm = this.formBuilder.group({
      carId: [this.carId, Validators.required],
      customerId: [this.localStorageService.getCurrentCustomer().customerId, Validators.required],
      rentDate: ['', Validators.required],
      returnDate: ['', Validators.required],
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
    localStorage.setItem("rent", String(this.rental.rentDate));

    if (rentDate < this.currentDate) {
      this.toastrService.warning(
        'Kiralama Tarihi, bu günden sonraki günler olmalıdır',
        'Dikkat'
      );
      return false;
    }

    if (returnDate < rentDate || returnDate.getDate() == rentDate.getDate()) {
      return this.toastrService.warning('Dönüş Tarihi, kiralama tarihinden sonraki günler olmalıdır', 'Dikkat');
    }

    this.rentalService.setRentingCar(this.rental);
    return this.router.navigate(['/payments']);
  }

  checkCarRentable() {
    this.rental = this.addRentCarForm.value;

    this.rentalService.getRentalsByCarId(this.carId).subscribe((responseSuccess) => {
      if (responseSuccess.data[0] == null) {
        this.setRentingCar();
        return true;
      }

      let lastItem = responseSuccess.data[responseSuccess.data.length - 1];

      if (lastItem.returnDate == null) {
        return this.toastrService.error('Bu araç henüz teslim edilmemiş');
      }

      let returnDate = new Date(lastItem.returnDate);
      
      if (new Date(this.rental.rentDate) < returnDate) {
        return this.toastrService.warning('Bu aracı bu tarihler arasında kiralayamazsınız', 'Dikkat');
      }

      return this.setRentingCar();
    });
  }
}
