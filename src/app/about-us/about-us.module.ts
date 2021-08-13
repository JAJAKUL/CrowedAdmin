import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutUsComponent } from './about-us.component';
import { AboutUsRoutingModule } from './about-us-routing.module';

import { CKEditorModule } from 'ng2-ckeditor';
import { FormsModule,FormGroup, FormBuilder, Validators, FormControl,ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AboutUsComponent],
  imports: [
    CommonModule,
    AboutUsRoutingModule,
    // CKEditorModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule
  ]
})
export class AboutUsModule { }
