import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatrixScreenComponent } from '../matrix-screen/matrix-screen.component';

const routes: Routes = [
  {
    path: '', component: MatrixScreenComponent, children: [
      { path: '', pathMatch: 'full', redirectTo: 'matrix-grid'},
      { path: 'matrix-grid', component: MatrixScreenComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatrixRoutingModule { }
