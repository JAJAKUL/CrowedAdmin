import { Component, OnInit } from '@angular/core';
import { navItems } from '../../_nav';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.prod';
import { AdminService } from '../../shared/service/admin.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {
  public sidebarMinimized = false;
  public navItems = navItems;
  profile_url;
  data;
  constructor(
    private router: Router,
    private adminService: AdminService,
    private domSanitizer: DomSanitizer,
  ) {
    this.profile_url = `${environment.baseImageAdminProfile}`;
  }
  ngOnInit() {
    // if (localStorage.getItem('isLoggedin') !== null) {
    //   if (localStorage['AdminData']) {
    //     this.data = JSON.parse(localStorage['AdminData']);
    //   }
    //   console.log('admin data is here', this.data);
    // }
    this.getAdminDetails();
  }
  getAdminDetails() {

    this.adminService.GetAdminDetails().subscribe(data => {
        console.log(data);
        if (data.code === 200) {
            this.data = data.data;
            let image = this.profile_url + this.data.profile_image
            this.profile_url = this.domSanitizer.bypassSecurityTrustUrl(image);
            console.log('this.profile_url================',this.profile_url)

        }
    }, err => {
        console.log(err);
        if (err.status >= 404) {
            console.log('Some error occured');
        } else {
            console.log('Internet Connection Error');
        }

    });
    }
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  logOut() {
    console.log('logout');

    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
