import { Directive, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[appTextStyle]'
})
export class TextStyleDirective {

  constructor(private el:ElementRef) {
    el.nativeElement.style.color="white";
    el.nativeElement.style.background="black";
    el.nativeElement.style.placeholder="test";
   }

  }