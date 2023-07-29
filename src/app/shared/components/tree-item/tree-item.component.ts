import { Component, Input, SimpleChange } from '@angular/core';
import { TemplateInjectorModel } from '../../models/template-injector-model';


@Component({
  selector: 'app-tree-item',
  templateUrl: './tree-item.component.html',
  styleUrls: ['./tree-item.component.scss']
})
export class TreeItemComponent {
  @Input() expansionItem: TemplateInjectorModel;
  public data:any;
  ngOnChanges(changes: SimpleChange){
    this.data= this.expansionItem.templateRefDataModel;
  }
}
