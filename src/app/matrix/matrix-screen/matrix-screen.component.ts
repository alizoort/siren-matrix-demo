import { Component, HostListener, TemplateRef, ViewChild } from '@angular/core';
import { SirenCrossPlatformMatrixModel, SirenMatrixModel, SirenMatrixRowModel } from '../../shared/models/siren-matrix-model';
import { TemplateInjectorModel } from '../../shared/models/template-injector-model';

@Component({
  selector: 'app-matrix-screen',
  templateUrl: './matrix-screen.component.html',
  styleUrls: ['./matrix-screen.component.scss']
})
export class MatrixScreenComponent {
  public dynamicTableModel : SirenMatrixModel;
  public crossPlatformMatrix : SirenCrossPlatformMatrixModel;
  public isDesktop: boolean = false;
  @ViewChild("cellItemRef") cellItemRef :TemplateRef<any>;
  @ViewChild("iconItemRef") iconItemRef :TemplateRef<any>;
  @ViewChild("phoneTableContainer") phoneTableContainer : TemplateRef<any>;
  @ViewChild("listingCellItemRef") listingCellItemRef : TemplateRef<any>;
  ngOnInit(): void{

  }
  @HostListener('window:resize', ['$event'])
  onResize(event){
    this.buildTable();
  }

  ngAfterViewInit(){
    this.buildTable()
   }
  myHeaderCellItems(label: string): TemplateInjectorModel[]{
    return   [{templateRefDataModel : {text: label,decoration: "cellule-item"},templateReference: this.cellItemRef},{templateRefDataModel: {icon:"assets/images/selected-expansion-arrow.svg",decoration:"table-cell-item"},templateReference: this.iconItemRef}];
  }
  myMobileHeaderCellItems(label: string){
    return  [{templateRefDataModel: {"text":label,"decoration":"cellule-item"},templateReference: this.cellItemRef}]
  }
  viewAppointment(){
    console.log("View Appointment !")
  }
   buildTable(){
    this.isDesktop = window.innerWidth >=800;
    this.crossPlatformMatrix = {
      desktopMatrix : new SirenMatrixModel(
        {
          listOfFactors: ["20%","23.33%","13.33%","23.33%","20%"],
          listOfRows: [],
          headerRow: new SirenMatrixRowModel({
            listOfCells: [
               this.myHeaderCellItems("booking_module.service_name"),
               this.myHeaderCellItems("booking_module.service_table_location"),
               this.myHeaderCellItems("booking_module.service_table_date"),
               this.myHeaderCellItems("booking_module.service_table_category"),
               this.myHeaderCellItems("booking_module.service_table_status")
            ]
          })
        }
      ),
      mobileMatrix: new SirenMatrixModel(
        {
          listOfFactors: ["80%","20%"],
          listOfRows: [

          ],
          headerRow: new SirenMatrixRowModel(
            {
              listOfCells: [
                this.myMobileHeaderCellItems(""),
                this.myMobileHeaderCellItems("")
              ]
            }
          ),
          decoration :  {'background-color': 'transparent'}
        }
      )
    }
    for(let index=0;index<100;index++){
      this.crossPlatformMatrix.desktopMatrix.addRow(
        new SirenMatrixRowModel(
          {
            listOfCells : [
              [{templateRefDataModel:{"text": "تسجيل سيارات","decoration":"cell-item"},templateReference: this.cellItemRef}],
              [{templateRefDataModel:{"text": "الدكوانه","decoration":"cell-item"},templateReference: this.cellItemRef}],
              [{templateRefDataModel:{"text": "٦/١٢/١٩٩٩","decoration":"cell-item"},templateReference: this.cellItemRef}],
              [{templateRefDataModel:{"text": "خدمة سوق","decoration":"cell-item"},templateReference: this.cellItemRef}],
              [
                {templateRefDataModel: {"text":"متاح","decoration":"completed-container"},templateReference: this.cellItemRef},
                {templateRefDataModel: {"icon":"assets/images/carbon_view-filled.svg","decoration":"icon-item-container","action":{"callback": () => this.viewAppointment()}},templateReference: this.iconItemRef}
              ],
             
            ]
          }
        )
      )
      this.crossPlatformMatrix.mobileMatrix.addRow(
        new SirenMatrixRowModel(
          {
            listOfCells: [
              [{templateRefDataModel:{"dataList":[
                {"label":"booking_module.service_type","value":"تسجيل سيارات"},
                {"label":'booking_module.service_table_status',"value":"متاح"},
                {"label":'booking_module.service_table_location',"value":"الدكوانه"},
                {"label": 'booking_module.service_table_date', "value":"٦/١٢/١٩٩٩"}
              ],"decoration":"listContainer"},templateReference: this.listingCellItemRef}],
              [
                {templateRefDataModel: {"icon":"assets/images/carbon_view-filled.svg","decoration":"icon-item-container","action":{"callback": () => this.viewAppointment()}},templateReference: this.iconItemRef}
              ]
            ],
            decoration:  {  'border-right':'4px solid #47BE45' , 'border-radius': '7px', 'margin-bottom':'5px' , 'border-top': '2px solid #efefef', 'background-color':'white'}
          }
        )
      )
    }
    if(this.isDesktop){
      this.dynamicTableModel=this.crossPlatformMatrix.desktopMatrix
    }
    else {
     
      this.dynamicTableModel=this.crossPlatformMatrix.mobileMatrix
    }
   }
}
