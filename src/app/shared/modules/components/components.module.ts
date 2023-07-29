import { NgModule, Provider } from "@angular/core";

import { ErrorDisplayComponent } from "../../components/error-display/error-display.component";

import { TextInputComponent } from "../../components/text-input/text-input.component";
import { PipesModule } from "../pipes/pipes.module";
import { DirectivesModule } from "../directives/directives.module";

import { TreeItemComponent } from "../../components/tree-item/tree-item.component";
import { SirenMatrixComponent } from "../../components/siren-matrix/siren-matrix.component";
import { DatepickerComponent } from "../../components/datepicker/datepicker.component";
import { SingleSelectComponent } from "../../components/single-select/single-select.component";
import { ThirdPartiesModule } from "../third-parties/third-parties.module";

@NgModule({
  imports: [ThirdPartiesModule, PipesModule, DirectivesModule],
  declarations: [
    TextInputComponent,
    ErrorDisplayComponent,
    SingleSelectComponent,
    DatepickerComponent,
    SirenMatrixComponent,
    TreeItemComponent,
  ],
  exports: [
    ThirdPartiesModule,
    PipesModule,
    TextInputComponent,
    ErrorDisplayComponent,
    SingleSelectComponent,
    DatepickerComponent,
    DirectivesModule,
    SirenMatrixComponent,
    TreeItemComponent,
  ],
})
export class ComponentsModule { }