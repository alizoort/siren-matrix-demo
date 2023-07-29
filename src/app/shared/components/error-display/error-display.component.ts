import { Component, OnInit, Input } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';

@Component({
    selector: 'app-error-display',
    templateUrl: './error-display.component.html',
    styleUrls: ['./error-display.component.scss']
})
export class ErrorDisplayComponent implements OnInit {
    @Input() control: FormControl;
    @Input() form: NgForm;
    @Input() customErrorMessage: NgForm;

    constructor() { }

    ngOnInit() { }

    public hasError(errorKey?: string) {
        return this.control?.hasError(errorKey) && this.control?.touched || this.control?.hasError(errorKey) && this.form?.submitted;
    }

    public getErrorMessage() {
        if (this.control && this.control.errors && this.control.errors.message) {

            return this.control.errors.message.value;
        }
    }

    isTouched() {
        return this.isControlDefined() && this.control.touched;
    }

    isSubmitted() {
        return this.isFormDefined() && this.form.submitted;
    }

    private isControlDefined() { return this.control !== undefined && this.control !== null; }
    private isFormDefined() { return this.form !== undefined && this.form !== null; }
}
