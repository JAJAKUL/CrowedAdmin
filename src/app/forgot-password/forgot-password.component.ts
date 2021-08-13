import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AdminService } from '../shared/service/admin.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  complexForm: FormGroup;
  reqData;
  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    private toastr: ToastrService,
    private adminService: AdminService,
  ) {
    this.complexForm = this.formBuilder.group({
        'email': [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$'), Validators.minLength(1)])],
      });
  }

  ngOnInit(): void {
    this.reqData = {};
  }

  forgot() {
    const obj = {
        email: this.reqData.email,
  };
    console.log(obj);
    this.adminService.forgotPassword(obj).subscribe(data => {
        // console.log(data)
        if (data.code === 200) {
          this.toastr.success('The password reset link send  to your email Successfully', 'Success');
          this.complexForm.reset();
          this.router.navigate(['/login']);
        }
    }, err => {
        console.log(err);
        if (err.status >= 400) {
          this.toastr.error('ADMIN DOSE NOT EXIST', 'Error');
          console.log('Invalid Credential!!!');
          this.complexForm.reset();
       } else {
          this.toastr.error('Internet Connection Error', 'Error');
          console.log('Internet Connection Error');
          this.complexForm.reset();
        }

    });
  }

}
