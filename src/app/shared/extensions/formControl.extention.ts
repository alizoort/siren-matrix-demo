import { AbstractControl, FormArray, FormGroup, ValidationErrors, Validators } from "@angular/forms";
import { DropdownOptionModel } from "../models/dropdown-option.model";
import { Field } from "../models/field.model";

export { }

declare module '@angular/forms' {
  interface AbstractControl {
    updateOthersValidatorForFormArray(formArrayName: string, index: number, fieldName: string, lookup: DropdownOptionModel[], lookupEnum, field: Field, maxlength?: number);
    updateNumberValidatorForFormControl(OnvalueChangeField: string, fieldToUpdate: string);
    updateNumberValidatorForFormArray(formArrayName: string, index: number, OnvalueChangeField: string, fieldToUpdate);
    isFilledControlsValid();
    isRequired();
    isRequiredAndNotFilled();
    isFilledFormArrayControlsValid();
    resetEmptyValueInFormGroup();
    resetEmptyValueInFormArray();
    isFilledInvalid();
  }
}

declare module '@angular/forms' {
  interface FormArray {
    isRequiredAndNotFilled();
    isFilledFormArrayControlsValid();
    resetEmptyValueInFormArray();
  }
}

AbstractControl.prototype.updateOthersValidatorForFormArray = function (formArrayName: string, index: number, fieldName: string, lookup: DropdownOptionModel[], lookupEnum, field: Field, maxlength?: number) {

  let selectedProperty = this.get(formArrayName)['controls'][index].get(fieldName).value;
  if (selectedProperty) {
    let selectedPropObj = lookup.find(f => f.id == selectedProperty);

    if (selectedPropObj?.type === lookupEnum.OTHER) {
      field.prop.forEach(propName => {
        if (maxlength) {
          this.get(formArrayName)['controls'][index].get(propName).setValidators([Validators.required, Validators.maxLength(maxlength)]);
        }
        else {
          this.get(formArrayName)['controls'][index].get(propName).setValidators([Validators.required]);
        }
        this.get(formArrayName)['controls'][index].get(propName).updateValueAndValidity();
      })

      return true
    }
    else {
      field.prop.forEach(propName => {
        this.get(formArrayName)['controls'][index].get(propName).setValidators(null);
        this.get(formArrayName)['controls'][index].get(propName).updateValueAndValidity();
      })
      return false;
    }
  }

  return null;
}

AbstractControl.prototype.updateNumberValidatorForFormControl = function (OnvalueChangeField: string, fieldToUpdate: string) {

  let selectedProperty = this.get(OnvalueChangeField).value;
  if (selectedProperty == "0" || selectedProperty == "٠") {
    this.get(fieldToUpdate).setValidators(null);
    this.get(fieldToUpdate).updateValueAndValidity();
  }
  else {
    this.get(fieldToUpdate).setValidators(Validators.required);
    this.get(fieldToUpdate).updateValueAndValidity();
  }

}

AbstractControl.prototype.updateNumberValidatorForFormArray = function (formArrayName: string, index: number, OnvalueChangeField: string, fieldToUpdate: string) {


  let selectedProperty = this.get(formArrayName)['controls'][index].get(OnvalueChangeField).value;

  if (selectedProperty != "0") {
    this.get(formArrayName)['controls'][index].get(fieldToUpdate).setValidators(Validators.required);
    this.get(formArrayName)['controls'][index].get(fieldToUpdate).updateValueAndValidity()
  }
  else {
    this.get(formArrayName)['controls'][index].get(fieldToUpdate).setValidators(null);
    this.get(formArrayName)['controls'][index].get(fieldToUpdate).updateValueAndValidity();
  }
}

AbstractControl.prototype.resetEmptyValueInFormGroup = function () {
  Object.keys(this.controls).forEach(key => {
    if (this.controls[key]?.value === "") {
      this.controls[key]?.setValue(null)
    }
  })
}

FormArray.prototype.resetEmptyValueInFormArray = function () {
  Object.keys(this.controls).forEach(index => {
    let form: FormGroup = this.get(index);
    Object.keys(form.controls).forEach(key => {
      if (form?.controls[key]?.value === "") {
        form?.controls[key].setValue(null)
      }
    })
  })
}

AbstractControl.prototype.isFilledControlsValid = function (): boolean {
  let isValid = true;
  Object.keys(this.controls).forEach(key => {
    const errors: ValidationErrors = this.get(key).errors;
    if (errors && !("required" in errors)) {
      isValid = false;
    }
  })
  return isValid
}

AbstractControl.prototype.isRequired = function (): boolean {
  let theValidators;
  if (this.validator) {
    theValidators = this.validator('');
  }
  return theValidators?.required;
}

FormArray.prototype.isRequiredAndNotFilled = function (): boolean{
  let existeFieldRequiredAndNotFilled = false
  Object.keys(this.controls).forEach(index => {
    let form: FormGroup = this.get(index);
    existeFieldRequiredAndNotFilled = !Object.keys(form.controls).some(prop => {
      !form.controls[prop].isRequiredAndNotFilled();
    })
    if(existeFieldRequiredAndNotFilled){
      return true;
    }
    else
      return false;
  });
  return false;
}

AbstractControl.prototype.isRequiredAndNotFilled = function (): boolean {
  let theValidators;
  let required;
  if (this.validator) {
    theValidators = this.validator('');
  }
  if (theValidators?.required){
    required= true;
  }else{
    required=false;
  }
  return required && this.value==null ;
}


FormArray.prototype.isFilledFormArrayControlsValid = function (): boolean {
  let isValid = true;
  Object.keys(this.controls).forEach(index => {
    let form: FormGroup = this.get(index);
    Object.keys(form.controls).forEach(key => {
      const errors: ValidationErrors = form.controls[key].errors;
      if (errors && !("required" in errors)) {
        isValid = false;
      }
    })
  });
  return isValid
}

AbstractControl.prototype.isFilledInvalid = function (): boolean {
  return this.invalid && this.value ? true : false;
}
