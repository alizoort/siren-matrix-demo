import { formatDate } from '@angular/common';
import { Component, Injectable, Input, OnDestroy, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, NativeDateAdapter } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { Subscription } from 'rxjs';

export const PICK_FORMATS = {
  parse: { dateInput: { month: 'long', year: 'numeric', day: 'short' } },
  display: {
    dateInput: 'input',
    monthYearLabel: { year: 'numeric', month: 'long' },
    dateA11yLabel: { year: 'numeric', month: 'long', day: 'short' },
    monthYearA11yLabel: { year: 'long', month: 'long' }
  }
};

@Injectable()
export class PickDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: any): string {
    date.setTime(date.getTime() + 60 * 60 * 1000 * 2) // doing this to fix the apple daylight savings issue
    if (displayFormat === 'input') {
      const numbers = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"]
      const formattedDate = formatDate(date, 'dd/MM/yyyy', 'ar', 'lb');
      let newValue = "";
      for (var i = 0; i < formattedDate.length; i++) {
        const newdigit = numbers[formattedDate.charAt(i)] || formattedDate.charAt(i);
        newValue = newValue.concat(newdigit);
      }
      return newValue
    } else {
      return date.toDateString();
    }
  }
  /**
   * Get a list of names for the days of the week
   * @param style
   * @returns
   */
  getDayOfWeekNames(style: 'long' | 'short' | 'narrow') {
    return ['الأحد', 'الأثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعه', 'السبت'];
  }
}

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: PickDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS }
  ]
})
export class DatepickerComponent implements OnDestroy {
  @ViewChild('picker') picker: MatDatepicker<any>;
  @Input() control: FormControl;
  @Input() title: string;
  @Input() startView: string = 'month';
  @Input() minDate = null;
  @Input() maxDate = null;
  @Input() shouldDisableDatePicker = false;
  @Input() withClear = false;
  @Input() customClass = '';
  @Input() filterFunction: (d: Date) => boolean;
  pickerSelectionSubscription: Subscription;
  constructor(private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('ar-LB');
  }

  public openPicker(): void {
    this.picker.open();
  }

  public closePicker(): void {
    this.picker.close();
  }

  public togglePicker(): void {

    if (this.picker.opened) {
      this.closePicker();
    }
    else {
      this.openPicker();
    }
  }

  ngOnDestroy() {
    if (this.pickerSelectionSubscription) { this.pickerSelectionSubscription.unsubscribe(); }
  }
  /**
   * clear the date
   * @param event: event
   */
  clearDate(event) {
    event.stopPropagation();
    this.control.setValue(null);
  }

}
