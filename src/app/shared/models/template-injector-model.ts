import { TemplateRef } from "@angular/core";

export class TemplateInjectorModel {
    constructor(public templateRefDataModel: any,public templateReference?:TemplateRef<any>){}
}