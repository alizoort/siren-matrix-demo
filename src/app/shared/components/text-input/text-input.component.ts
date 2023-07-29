
import { Component, EventEmitter, Input, Output, Self } from '@angular/core';
import { ControlValueAccessor, NgControl, NgForm } from '@angular/forms';
import 'src/app/shared/extensions/formControl.extention';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent implements ControlValueAccessor {
  @Input() placeholdertext: string;
  @Input() formControlName: string;
  @Input() inputType: string = 'text';
  @Input() maxlength: number;
  @Input() direction: string = 'rtl';
  @Input() inputIcon: string;
  @Input() ngForm : NgForm;
  @Input() placeholderLabel:string;
  @Input() disabled : boolean = true;
  @Input() isMultiline: boolean = false;
  @Input() customErrorMessage: string = '';
  @Input() applyUpperCase: boolean = false;
  @Output() inputIconClick: EventEmitter<any> = new EventEmitter();
  @Output() onChangeDetection :  EventEmitter<any> = new EventEmitter();
  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }

  writeValue(obj: any): void {
  }
  registerOnChange(fn: any): void {

  }
  registerOnTouched(fn: any): void {

  }
  onInputChange(event){
    this.onChangeDetection.emit(event);
  }

  fieldInvalid(): boolean {
    const field = this.ngControl.control;
    return field.touched && field.invalid;

  }

  emitInputIconClick(e): void {

    this.inputIconClick.emit(e);
  }

}
