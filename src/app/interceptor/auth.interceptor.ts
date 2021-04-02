import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ColorService } from '../services/color/color.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private colorService:ColorService) {}


  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token=localStorage.getItem("token");
    let newRequest:HttpRequest<any>;
    newRequest=request.clone({
      headers:request.headers.set("Authorization","Bearer "+token)
    })
    return next.handle(newRequest);
  }
}