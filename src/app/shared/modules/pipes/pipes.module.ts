import { NgModule } from "@angular/core";
import { AppendIfTrue } from "../../pipes/field-required-pipe.pipe";
import {SafeHtmlPipe} from "../../pipes/safe-html-pipe.pipe";


@NgModule({
  declarations: [AppendIfTrue, SafeHtmlPipe, ],
  exports: [AppendIfTrue, SafeHtmlPipe,],
})
export class PipesModule {}
