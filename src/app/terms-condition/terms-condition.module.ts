import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermsConditionComponent } from './terms-condition.component';

import { TermsConditionRoutingModule } from './terms-condition-routing.module';

import { CKEditorModule } from 'ng2-ckeditor';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TermsConditionComponent],
  imports: [
    CommonModule,
    TermsConditionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule
  ]
})
export class TermsConditionModule { }
