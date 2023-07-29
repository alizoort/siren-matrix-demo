import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatrixScreenComponent } from './matrix-screen/matrix-screen.component';
import { MatrixWrapperComponent } from './matrix-wrapper/matrix-wrapper.component';

const routes: Routes = [
  {
    path: '', component: MatrixWrapperComponent, children: [
      { path: '', pathMatch: 'full', redirectTo: 'matrix-grid'},
      { path: 'matrix-grid', component: MatrixWrapperComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatrixRoutingModule { }
