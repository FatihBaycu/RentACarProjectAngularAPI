import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer/customer';
import { LocalStroageService } from 'src/app/services/local-stroage.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {
  kontrol:any;
  constructor(private localStorageService:LocalStroageService,private router:Router) { }
  
  ngOnInit(): void { 

        this.kontrol=this.localStorageService.getItem("isauth");

  }

  logout(){
    this.localStorageService.setItem("isauth",false);
        localStorage.clear();
        console.log("Çıkış Yapıldı");
        this.router.navigate(['/cars'])
        .then(() => {
          window.location.reload();
          window.location.reload();
        });
  }

  getCurrentCustomer(): Customer{
    return this.localStorageService.getCurrentCustomer();
  }
}
