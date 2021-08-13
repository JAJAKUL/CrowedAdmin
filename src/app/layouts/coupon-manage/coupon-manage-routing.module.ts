import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CouponManageComponent } from './coupon-manage.component';

const routes: Routes = [{
  path:'',
  component: CouponManageComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CouponManageRoutingModule { }
