import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { AdminService } from '../shared/service/admin.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  complexForm: FormGroup;
  reqData;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public formBuilder: FormBuilder,
    public adminService: AdminService,
    private toastr: ToastrService
  ) {
    this.complexForm = this.formBuilder.group(
      {
        password: [
          null,
          Validators.compose([Validators.required, Validators.minLength(6)]),
        ],
        confirmPassword: [
          null,
          Validators.compose([Validators.required, Validators.minLength(6)]),
        ],
      },
      { validator: this.checkPasswords }
    );
  }

  ngOnInit(): void {
    this.reqData = {};
  }

  checkPasswords(group: FormGroup) {
    // here we have the 'passwords' group
    let pass = group.get('password').value;
    let confirmPass = group.get('confirmPassword').value;
    return pass === confirmPass ? null : { notSame: true };
  }

  get rpf() {
    return this.complexForm.controls;
  }

  resetPass() {
    let token = this.route.snapshot.queryParams['token'];
    // console.log("token",token)
    var obj = {
      token: token,
      password: this.reqData.password,
    };
    console.log(obj);
    this.adminService.resetPassword(obj).subscribe(
      (data) => {
        console.log(data);
        if ( data.code === 200) {
          this.toastr.success('Password reset successfully', 'Success');
          localStorage.removeItem('isLoggedin');
          this.router.navigate(['/login']);
        }
      },
      (err) => {
        // console.log(err)
        if (err.status <= 404) {
          this.toastr.error('Link expired, please try again!!', 'Error');
          console.log('Link expired, please try again!!');
          this.complexForm.reset();
        } else {
          this.toastr.error('Some error occured, please try again!!', 'Error');
          console.log('Internet Connection Error');
          this.complexForm.reset();
        }
      }
    );
  }
}
