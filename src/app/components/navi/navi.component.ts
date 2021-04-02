import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalStroageService } from 'src/app/services/local-stroage.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  constructor(private localStorageService:LocalStroageService,private toastrService:ToastrService,private router:Router) { }
  kontrol:any;
  check:boolean;

  name?:string;
  ngOnInit(): void { 

      this.localStorageService.getCurrentCustomer();
      this.name=this.localStorageService.getCurrentCustomer().firstName;
    
        console.log(this.localStorageService.getItem("isauth"));
        this.kontrol=this.localStorageService.getItem("isauth");

  }
  logout(){
    this.localStorageService.setItem("isauth",false);

        localStorage.clear();
        console.log("Çıkış Yapıldı");
        this.router.navigate(['cars'])
        .then(() => {
          window.location.reload();
        });
  }

}
