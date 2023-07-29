import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatrixRoutingModule } from './matrix-routing.module';
import { SharedModule } from '../shared/modules/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    MatrixRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MatrixModule { }
