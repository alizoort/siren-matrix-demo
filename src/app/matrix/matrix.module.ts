import { NgModule } from '@angular/core';


import { MatrixRoutingModule } from './matrix-routing.module';
import { SharedModule } from '../shared/modules/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatrixScreenComponent } from './matrix-screen/matrix-screen.component';
import { MatrixWrapperComponent } from './matrix-wrapper/matrix-wrapper.component';


@NgModule({
  declarations: [
    MatrixScreenComponent,
    MatrixWrapperComponent
  ],
  imports: [
    MatrixRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MatrixModule { }
