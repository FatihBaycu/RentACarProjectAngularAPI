import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer/customer';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStroageService } from 'src/app/services/local-stroage.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {
  kontrol: any;
  constructor(private localStorageService: LocalStroageService,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {

    this.kontrol = this.localStorageService.getItem("isauth");

  }

  isAuth(): boolean {
    return this.authService.isAuthenticated();
  }

  logout() {
    this.localStorageService.removeToken();
    this.localStorageService.removeCurrentCustomer();
    return this.router.navigate(["/login"]);
  }

  getCurrentCustomer(): Customer {
    return this.localStorageService.getCurrentCustomer();
  }
}
