import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'matrix', loadChildren: ()=> import('./matrix/matrix.module').then(m => m.MatrixModule)},
  { path: '**', pathMatch : 'full', redirectTo: 'matrix'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
