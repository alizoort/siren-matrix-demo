import { TemplateInjectorModel } from "./template-injector-model";

export class SirenCrossPlatformMatrixModel {
    public  desktopMatrix : SirenMatrixModel;
    public  mobileMatrix : SirenMatrixModel;
} 
export class SirenMatrixModel {
    private _listOfFactors:string[];
    private _listOfRows:SirenMatrixRowModel[];
    private _headerRow: SirenMatrixRowModel;
    public decoration : any;
    private _filteredRows : SirenMatrixRowModel[]
    public constructor(parameters: {
         listOfFactors:string[],
         listOfRows:SirenMatrixRowModel[],
         headerRow: SirenMatrixRowModel,
         decoration? : any,
         filteredRows? : SirenMatrixRowModel[]
    }
    ){
       if(parameters.listOfFactors.length!== parameters.headerRow.listOfCells.length){
        throw new Error("List Of Factors should have the same length as the list of cells");
       }
       else if(parameters.headerRow.listOfCells.length && parameters.listOfRows.length>0 && parameters.listOfRows.find((row: SirenMatrixRowModel)=> row.listOfCells.length != parameters.headerRow.listOfCells.length)){
        throw new Error("Make sure that all the rows have the number of cells equal to the number of columns");
       }
       this._listOfFactors = parameters.listOfFactors;
       this._listOfRows = parameters.listOfRows;
       this._headerRow = parameters.headerRow;
       this.decoration = parameters.decoration || {};
       this._filteredRows = parameters.filteredRows || [];
    }
    public addRow(row : SirenMatrixRowModel){
       if(row.listOfCells.map((cell)=> cell.expansionFactor).reduce((accumulator,value)=> accumulator+value,0)!= this._headerRow.listOfCells.length){
            throw new Error("Please make sure that the sum of the cell factors is equal to the number of columns")
        }
        this._listOfRows.push(row)
    }
    get listOfFactors(){
        return this._listOfFactors;
    }
    get headerRow(){
        return this._headerRow
    }
    get listOfRows(){
        return this._listOfRows;
    }
    set listOfRows(rows : SirenMatrixRowModel[]){
        if(rows.find((row)=> row.listOfCells.map((cell)=> cell.expansionFactor).reduce((accumulator,value)=> accumulator+value,0)!= this._headerRow.listOfCells.length)){
            throw new Error("Please make sure that the number of cells is equal to the number of columns") 
        }
        this._listOfRows = rows;
    }
    get filteredRows(){
        return this._filteredRows
    }
    set filteredRows(rows : SirenMatrixRowModel[]){
        if(rows.find((row)=> row.listOfCells.map((cell)=> cell.expansionFactor).reduce((accumulator,value)=> accumulator+value,0)!= this._headerRow.listOfCells.length)){
            throw new Error("Please make sure that the number of cells is equal to the number of columns") 
        }
        this._filteredRows = rows;
    }
}
export class SirenMatrixRowModel{
    public listOfCells:SirenMatrixCellModel[];
    public decoration : any={}
    public constructor(
        parameters: {
            listOfCells:SirenMatrixCellModel[],
            decoration? : any
        }
    ){
        this.listOfCells = parameters.listOfCells;
        this.decoration = parameters.decoration || {};
    }
}
export class SirenMatrixCellModel {
    public _expansionFactor: number;
    public _decoration : any;
    public _cellItems : TemplateInjectorModel[];
    public constructor(parameters: {
        expansionFactor?: number, decoration?: any,cellItems: TemplateInjectorModel[]
    }){
        this._expansionFactor=parameters.expansionFactor || 1;
        this._decoration = parameters.decoration || {};
        this._cellItems = parameters.cellItems
    }
    get expansionFactor(){
        return this._expansionFactor
    }
    get cellItems(){
        return this._cellItems
    }
    get decoration(){
        return this._decoration
    }
}