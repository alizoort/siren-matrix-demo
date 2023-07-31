import { NgModule } from "@angular/core";
import { AppendIfTrue } from "../../pipes/field-required-pipe.pipe";
import {SafeHtmlPipe} from "../../pipes/safe-html-pipe.pipe";
import { CellMerger } from "../../pipes/cell-merger-pipe.pipe";


@NgModule({
  declarations: [AppendIfTrue, SafeHtmlPipe, CellMerger],
  exports: [AppendIfTrue, SafeHtmlPipe,CellMerger],
})
export class PipesModule {}
