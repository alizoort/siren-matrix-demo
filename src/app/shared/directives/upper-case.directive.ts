import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appUpperCase]'
})
export class UpperCaseDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInput(event: Event) {
  
      const inputValue = this.el.nativeElement.value.toUpperCase();
    this.el.nativeElement.value = inputValue;

  }

}
