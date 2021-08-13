import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminProfileComponent } from './admin-profile.component';
import { AdminProfileRoutingModule } from './admin-profile-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';


@NgModule({
  declarations: [AdminProfileComponent],
  imports: [
    CommonModule,
    AdminProfileRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatSliderModule,
MatDatepickerModule,
MatInputModule,
MatFormFieldModule,
MatNativeDateModule,
// AngularDateTimePickerModule,
  ]
})
export class AdminProfileModule { }
