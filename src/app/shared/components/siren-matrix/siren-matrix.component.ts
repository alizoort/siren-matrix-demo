import { Component, Input, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { SirenMatrixModel } from 'src/app/shared/models/siren-matrix-model';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'siren-matrix',
  templateUrl: './siren-matrix.component.html',
  styleUrls: ['./siren-matrix.component.scss']
})
export class SirenMatrixComponent {
_dynamicTableModel : SirenMatrixModel;
get dynamicTableModel(){
  return this._dynamicTableModel;
}
@Input() set dynamicTableModel(model: SirenMatrixModel){
if(model){
  this._dynamicTableModel=model;
  this.headRowIndex=0;
  this.dynamicTableModel.filteredRows = this.dynamicTableModel.listOfRows.slice(this.headRowIndex,this.selectedRowsPerPageGroup.name);
}
}
public selectedRowsPerPageGroup = {"id":1,"name":25};
public headRowIndex : number=0;
_paginationCoefficient=5;
get paginationCoefficient(){
  return this._paginationCoefficient
}
@Input() set paginationCoefficient(coef : number){
  this.pageGroups=[];
  this._paginationCoefficient=coef;
  for(let pageLength =1; pageLength <=10;pageLength++){
    this.pageGroups.push({"id": pageLength,"name":pageLength*this.paginationCoefficient});
  }
}
public pageGroups : any[]=[
  {"id":1,"name":5},
  {"id": 2,"name": 10},
  {"id":3 ,"name": 15},
  {"id": 4,"name": 20},
  {"id":5,"name":25},
  {"id":6,"name":50},
  {"id":7,"name":75},
  {"id":8,"name":100},
];
public intelliMatrixFormGroup : FormGroup;
public constructor(public translateService : TranslateService){
  this.intelliMatrixFormGroup = new FormGroup({
    groupSelector: new FormControl(this.selectedRowsPerPageGroup,[])
  })
}
ngOnInit(){
  this.intelliMatrixFormGroup.get('groupSelector').valueChanges.subscribe((value)=>{
    this.selectedRowsPerPageGroup = this.pageGroups.find((group)=> group.id === value);
    this.dynamicTableModel.filteredRows = this.dynamicTableModel.listOfRows.slice(this.headRowIndex,this.headRowIndex + this.selectedRowsPerPageGroup.name);
  })
  this.pageGroups.length >0 ? this.intelliMatrixFormGroup.get("groupSelector").setValue(this.pageGroups[0].id) : null;
}
showNextPage(event){
  if(this.headRowIndex + this.selectedRowsPerPageGroup.name<= this.dynamicTableModel.listOfRows.length){
  this.headRowIndex= this.headRowIndex + this.selectedRowsPerPageGroup.name;
  this.dynamicTableModel.filteredRows = this.dynamicTableModel.listOfRows.slice(this.headRowIndex,this.headRowIndex+this.selectedRowsPerPageGroup.name)
  }
}
showPreviousPage(event){
  if(this.headRowIndex!=0){
    this.headRowIndex= this.headRowIndex - this.selectedRowsPerPageGroup.name >0 ? this.headRowIndex - this.selectedRowsPerPageGroup.name  : 0;
    this.dynamicTableModel.filteredRows = this.dynamicTableModel.listOfRows.slice(this.headRowIndex,this.headRowIndex+this.selectedRowsPerPageGroup.name)
  }
}
get showCurrentPage(){
  return this.dynamicTableModel && this.selectedRowsPerPageGroup ? `${(Math.ceil(this.headRowIndex/this.selectedRowsPerPageGroup.name)+1).toLocaleString('ar-EG')} ${this.translateService.instant('booking_module.of')} ${Math.ceil(this.dynamicTableModel.listOfRows.length/this.selectedRowsPerPageGroup.name).toLocaleString('ar-EG')}` :""
}
get showPagination(){
  return this.dynamicTableModel && this.pageGroups && this.pageGroups.length>0 && this.dynamicTableModel.listOfRows.length> this.pageGroups[0].name;
}
}
