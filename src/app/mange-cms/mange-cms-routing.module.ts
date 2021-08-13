import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MangeCmsComponent } from './mange-cms.component';


const routes: Routes = [
  {
    path:'',
    component: MangeCmsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MangeCmsRoutingModule { }
