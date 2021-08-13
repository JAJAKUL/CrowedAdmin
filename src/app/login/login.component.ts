import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from './../shared/service/admin.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  complexForm: FormGroup;
  reqData;
  passwordShowHide = true;
  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    private toastr: ToastrService,
    public adminService: AdminService
  ) {
    this.complexForm = this.formBuilder.group({
      email: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern(
            '^[a-zA-Z0-9]+(.[_a-z0-9]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,15})$'
          ),
          Validators.minLength(1),
        ]),
      ],
      password: [null, Validators.compose([Validators.required])],
    });
  }

  ngOnInit(): void {
    this.reqData = {};
  }
  hideShowPassword() {
    console.log('uishaf iaufh ');

    this.passwordShowHide = !this.passwordShowHide;
  }

  login() {
    console.log('check login button', this.reqData);


    localStorage.clear();
    this.adminService.login(this.reqData).subscribe(
      (data) => {
        // console.log(data)
        if (data.token) {
          console.log(data.token)
          localStorage.setItem('isLoggedin', 'true');
          localStorage['AdminData'] = JSON.stringify(data.data);
          localStorage['token'] = JSON.stringify(data.token);
          this.complexForm.reset();
          this.toastr.success('Login Successfully', 'Success');
          this.router.navigate(['/dashboard']);
        }
      },
      (err) => {
        // console.log(err)
        if (err.status >= 400) {
          this.toastr.error('Invalid Credential!!!', 'Error');
          console.log('Invalid Credential!!!');
          this.complexForm.reset();
        } else {
          this.toastr.error('Internet Connection Error', 'Error');
          console.log('Internet Connection Error');
          this.complexForm.reset();
        }
      }
    );
  }
}
