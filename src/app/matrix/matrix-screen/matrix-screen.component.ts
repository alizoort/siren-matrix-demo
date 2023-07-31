import { Component, HostListener, TemplateRef, ViewChild } from '@angular/core';
import { SirenCrossPlatformMatrixModel, SirenMatrixCellModel, SirenMatrixModel, SirenMatrixRowModel } from '../../shared/models/siren-matrix-model';
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
  myHeaderCellItems(label: string): SirenMatrixCellModel{
    return   new SirenMatrixCellModel({
      cellItems: [{templateRefDataModel : {text: label,decoration: "cellule-item"},templateReference: this.cellItemRef},{templateRefDataModel: {icon:"assets/images/selected-expansion-arrow.svg",decoration:"table-cell-item"},templateReference: this.iconItemRef}]
    });
  }
  myMobileHeaderCellItems(label: string){
    return  new SirenMatrixCellModel({
      cellItems: [{templateRefDataModel: {"text":label,"decoration":"cellule-item"},templateReference: this.cellItemRef}]
    })
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
          }),
          decoration: {'background-color' : 'rgba(251, 219, 188, 0.938)', 'border-radius': '0.5rem',
          'border':'4px solid blue'}
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
             new SirenMatrixCellModel({
              cellItems:  [{templateRefDataModel:{"text": "تسجيل سيارات","decoration":"cell-item"},templateReference: this.cellItemRef}]
             }),
             new SirenMatrixCellModel({
              decoration:{'background-color': 'red'},
              cellItems:  [{templateRefDataModel:{"text": "الدكوانه","decoration":"cell-item"},templateReference: this.cellItemRef}]
             }),
            new SirenMatrixCellModel({
              cellItems:   [{templateRefDataModel:{"text": "٦/١٢/١٩٩٩","decoration":"cell-item"},templateReference: this.cellItemRef}]
            }),
             new SirenMatrixCellModel({
              decoration:{'background-color': 'red'},
              expansionFactor:2,
             cellItems: [{templateRefDataModel:{"text": "خدمة سوق","decoration":"cell-item"},templateReference: this.cellItemRef}]
             }),
         /*     new SirenMatrixCellModel({
              cellItems:  [
                {templateRefDataModel: {"text":"متاح","decoration":"completed-container"},templateReference: this.cellItemRef},
                {templateRefDataModel: {"icon":"assets/images/carbon_view-filled.svg","decoration":"icon-item-container","action":{"callback": () => this.viewAppointment()}},templateReference: this.iconItemRef}
              ]
             }), */
             
            ],
            decoration : {'border-right':`4px solid ${index%2==0? '#47BE45' : 'red'}`,'border-top':`4px solid ${index%2==0? '#47BE45' : 'red'}`}
          },
       
        )
      )
      this.crossPlatformMatrix.mobileMatrix.addRow(
        new SirenMatrixRowModel(
          {
            listOfCells: [
              new SirenMatrixCellModel({
                cellItems:   [{templateRefDataModel:{"dataList":[
                  {"label":"booking_module.service_type","value":"تسجيل سيارات"},
                  {"label":'booking_module.service_table_status',"value":"متاح"},
                  {"label":'booking_module.service_table_location',"value":"الدكوانه"},
                  {"label": 'booking_module.service_table_date', "value":"٦/١٢/١٩٩٩"}
                ],"decoration":"listContainer"},templateReference: this.listingCellItemRef}]
              }),
             new SirenMatrixCellModel({
              cellItems:  [
                {templateRefDataModel: {"icon":"assets/images/carbon_view-filled.svg","decoration":"icon-item-container","action":{"callback": () => this.viewAppointment()}},templateReference: this.iconItemRef}
              ]
             })
            ],
            decoration:  {  'border-right':`4px solid ${index%2==0? '#47BE45' : 'red'}` , 'border-radius': '7px', 'margin-bottom':'5px' , 'border-top': '2px solid #efefef', 'background-color':'white'}
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
