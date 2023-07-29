import { DropdownOptionModel } from './../../models/dropdown-option.model';
import { CdkVirtualScrollViewport, ScrollDispatcher } from '@angular/cdk/scrolling';
import { Component, OnInit, Input, Output, ViewChild, EventEmitter, ElementRef, SimpleChanges, OnChanges, ViewChildren, QueryList, ChangeDetectorRef, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatSelectChange, MatSelect } from '@angular/material/select';

@Component({
    selector: 'app-single-select',
    templateUrl: './single-select.component.html',
    styleUrls: ['./single-select.component.scss'],
})
export class SingleSelectComponent implements ControlValueAccessor, OnInit, OnChanges {
    @Input() placeholderLabel: string;
    @Input() dropdownList: DropdownOptionModel[];
    @Input() withClearButton: boolean = true;
    @Input() withFilter: boolean = true;
    @Output() selectionChange = new EventEmitter<MatSelectChange>();
    @ViewChild('select') private select: MatSelect;
    @ViewChild('searchInput') searchInput: ElementRef;
    filteredDropdownList: DropdownOptionModel[];
    selectedValueID: number;
    selectedValuePlaceholder: string;
    searchValue = '';
    clearBtnDisabled = false;
    isDropdownOpen = false;
    @ViewChild(CdkVirtualScrollViewport,) cdkVirtualScrollViewPort: CdkVirtualScrollViewport;
    @ViewChildren(MatOption)
    options: QueryList<MatOption>;

    constructor(@Self() public ngControl: NgControl,
        readonly sd: ScrollDispatcher) {
        this.ngControl.valueAccessor = this;
    }

    displaySelectedTexts(id?: number) {
        if (id) {
            let option = this.dropdownList?.find(x => x.id == this.ngControl.control?.value);
            let arabic = option?.name;
            let english = option?.nameEn ?? option?.nameEn ?? ''
            this.selectedValuePlaceholder = arabic + " " + english
        }
    }

    foropen() {
        if (this.cdkVirtualScrollViewPort) {
            this.cdkVirtualScrollViewPort.scrollToIndex(5);
        }
    }

    openChange(event: boolean) {
        if (event) {
            this.isDropdownOpen = true;
            this.searchValueChanged = '';
            this.foropen();
            this.cdkVirtualScrollViewPort.scrollToIndex(0);
            this.cdkVirtualScrollViewPort.checkViewportSize();
            this.focusSearchInput()
        } else {
            this.isDropdownOpen = false;
            this.searchValueChanged = '';
            this.filteredDropdownList = [...this.dropdownList];
        }
    }

    ngOnInit() {

        this.ngControl.control.valueChanges.subscribe(x => {
            if (!this.isDropdownOpen) {
                this.optionSelected();
            }
        })
    }

    ngOnChanges(changes: SimpleChanges) {
        this.filteredDropdownList = this.dropdownList

        if (changes['dropdownList']) {
            //check if filtered data
            //check is selected all
            this.optionSelected();
            if (this.selectedValueID) {
                let item = this.filteredDropdownList.find(x => x.id === this.selectedValueID)
                if (!item) {
                    this.selectedValueID = null;
                    this.selectedValuePlaceholder = null;
                }
            }
        }
    }

    get searchValueChanged(): string {
        return this.searchValue;
    }

    set searchValueChanged(event: string) {
        this.searchValue = event;
        event = event.trim().toLowerCase(); // Remove whitespace then to to lowercase cz datasource defaults to lowercase matches
        if (event !== '') {
            this.filteredDropdownList = this.dropdownList.filter(option => (option.name?.toLowerCase().indexOf(event) >= 0) || (option.nameEn?.toLowerCase().indexOf(event) >= 0) || (option.nameEn?.toLowerCase().indexOf(event) >= 0));
        } else {
            this.filteredDropdownList = [...this.dropdownList];
            const opt = this.dropdownList.find(option => '' + option?.id == event);
            if (opt) {
                this.ngControl.control.setValue(opt.id);
            }
        }
    }

    // angular built in methods
    registerOnChange(fn: (selectedItem: Array<number | string | any> | number | string) => void): void { }
    registerOnTouched(fn: () => void): void { }
    setDisabledState(isDisabled: boolean): void {
        this.clearBtnDisabled = isDisabled;
    }

    writeValue(selectedItem: any | Array<number | string | any>): void {// triggered on control.setValue()

    }

    optionSelected() {
        this.filteredDropdownList = this.dropdownList;
        this.selectionChange.emit(new MatSelectChange(this.select, this.getSelectedValue()));
        this.selectedValueID = this.getSelectedValue();
        this.selectedValueID ? this.displaySelectedTexts(this.selectedValueID) : null;
    }

    // custom control methods
    clear() {
        if(!this.clearBtnDisabled)
            this.ngControl.control.setValue(null);
    }


    getSelectedValue() {
        return this.ngControl.control.value;
    }

    handleInput(event: KeyboardEvent): void {
        event.stopPropagation();
    }

    public resetSearchValue() {
        if (this.searchValue !== '') {
            this.searchValueChanged = '';
        }
    }

    private focusSearchInput() {
        if (this.searchInput) {
            this.searchInput.nativeElement.focus();
        }
    }


}
