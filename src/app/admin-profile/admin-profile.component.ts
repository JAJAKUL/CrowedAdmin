import { Component, OnInit } from '@angular/core';
import { AdminService } from '../shared/service/admin.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment.prod';
import * as moment from 'moment';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent implements OnInit {
  Form: FormGroup;
  Form1: FormGroup;
  reqData;
  changeName;
  changePassword;
  changeImage;
  adminData;
  getData;
  loading;
  profileImage;
  profileImageSrc;
  profile_url;
  date: Date = new Date();
  settings = {
      bigBanner: true,
      timePicker: false,
      format: 'dd-MM-yyyy',
      defaultOpen: false
  };
  token;
  constructor(

      public router: Router,
      private adminService: AdminService,
      private formBuilder: FormBuilder,
      private toastr: ToastrService,
      private domSanitizer: DomSanitizer,
  ) {
      this.profile_url = `${environment.baseImageAdminProfile}`;
      // console.log(this.profileImageSrc);

      this.Form = formBuilder.group({
          // 'email': [null, Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$'), Validators.minLength(1)])],
          'phone': [null, Validators.compose([Validators.required, Validators.minLength(10)])],
          'name': [null, Validators.compose([Validators.required])],
          // 'dob': [null, Validators.compose([Validators.required])],
      });
      this.Form1 = formBuilder.group({
          'oldPassword': [null, Validators.compose([Validators.required])],
          'newPassword': [null, Validators.compose([Validators.required, Validators.minLength(6)])],
          'confirmPassword': [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      },
          {validator: this.checkPasswords }
      );
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
      const pass = group.get('newPassword').value;
      const confirmPass = group.get('confirmPassword').value;
      return pass === confirmPass ? null : { notSame: true };
  }

  get rpf() {
      return this.Form1.controls;
  }

  ngOnInit() {
      this.getData = {};
      this.changeName = false;
      this.changePassword = false;
      this.changeImage = false;
      this.reqData = {};
      // this.profileImageSrc = `${environment.baseImageAdminProfile}`;
      this.token = localStorage.token ? localStorage.token : null ;
      console.log('localStorage=============', localStorage.token);
      this.getAdminDetails();
      // this.adminData = localStorage.getItem('AdminData');
      // this.reqData = JSON.parse(this.adminData);

      // console.log(this.adminData);
      // console.log(this.reqData);
  }

  getAdminDetails() {

  this.adminService.GetAdminDetails().subscribe(data => {
      console.log(data);
      if (data.code === 200) {
          this.reqData = data.data;
          if(this.reqData.profile_image){

            this.profile_url = this.profile_url + this.reqData.profile_image;
          }
          // this.profile_url = this.domSanitizer.bypassSecurityTrustUrl(this.profile_url + this.reqData.profile_image);

      }
  }, err => {
      console.log(err);
      if (err.status >= 404) {
          console.log('Some error occured');
      } else {
          this.toastr.error('Some error occured, please try again!!', 'Error');
          console.log('Internet Connection Error');
      }

  });
  }

  changePro() {
      this.changeName = true;
      this.changePassword = false;
      this.changeImage = false;
  }
  changeImg() {
      this.changeName = false;
      this.changePassword = false;
      this.changeImage = true;
  }
  changePass() {
      this.changeName = false;
      this.changePassword = true;
      this.changeImage = false;
  }

  submitProfile() {
      // console.log('==============pro')
      const obj = {
          //   adminID: this.reqData._id,
          name: this.reqData.name,
          // email: this.reqData.email,
          phone: this.reqData.phone,
          // dob: moment(new Date(this.reqData.dob)).format('YYYY-MM-DD'),
      };
      console.log(obj);
      this.adminService.profileUpdate(obj).subscribe(data => {
          if (data.code === 200) {
              this.changeName = false;
              this.changePassword = false;
              this.changeImage = false;
              localStorage.removeItem('AdminData');
              this.toastr.success(data.message, 'Success');
              localStorage['AdminData'] = JSON.stringify(data.data);
              // this.ngOnInit();
              this.router.navigateByUrl('/', { skipLocationChange: true })
                .then(() => {
                  // redirect to specific component without loading page
                  this.router.navigate(['/admin-profile']);
                });
                window.location.reload();

          } else {
              this.toastr.error(data.message, 'error');
          }
      }, err => {
          // console.log(err);
          this.toastr.error(err.message.message, 'error');
      });
  }
  submitPassword() {
      const obj = {
          // adminID: this.reqData._id,
          oldpassword: this.getData.password,
          password: this.getData.newPassword,
      };
      console.log(obj);
      this.adminService.changePassword(obj).subscribe(data => {
          // console.log('========================',data)
          if (data.code === 200) {
              this.changeName = false;
              this.changePassword = false;
              this.changeImage = false;
              // localStorage.removeItem('AdminData');
              this.toastr.success(data.message, 'Success');
              // localStorage['AdminData'] = JSON.stringify(data.data);
              this.ngOnInit();
          } else {
              this.toastr.error(data.message, 'error');
          }
      }, err => {
          // console.log('errrrrrrrrrrr',err);
          this.toastr.error(err.message.message, 'error');
      });
  }
submitImage() {

  var form = new FormData();

  form.append('profile_image', this.profileImage);

  this.adminService.profileUpdate(form).subscribe(data => {
    if (data.code === 200) {
      this.changeName = false;
      this.changePassword = false;
      this.changeImage = false;
      localStorage.removeItem('AdminData');
      this.toastr.success(data.message, 'Success');
      localStorage['AdminData'] = JSON.stringify(data.data);
      this.router.navigateByUrl('/dashboard', { skipLocationChange: true })
      .then(() => {
        // redirect to specific component without loading page
        this.router.navigate(['/admin-profile']);
      });
      window.location.reload();

    } else {
      this.toastr.error(data.message, 'error');
    }
  }, err => {
      // console.log(err);
      this.toastr.error(err.status, 'error');
  });
}

readURL(event) {
  if (event.target.files && event.target.files[0]) {
    const file = event.target.files[0];
    // console.log('file ',file.size);
    if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/jpg') {
      // this.toastr.warning('Please upload image file')
      return;
    }

    const reader = new FileReader();

    reader.onload = e => this.profileImageSrc = reader.result;

    reader.onloadend = (loadEvent) => {
      // console.log(reader)
      const mainImage = reader.result;
      this.profileImage = file
    };

    reader.readAsDataURL(file);
  }
}


}
