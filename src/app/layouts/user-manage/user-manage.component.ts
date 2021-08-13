import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { AdminService } from '../../shared/service/admin.service';
import { ToastrService } from 'ngx-toastr';
import { SelectionModel } from '@angular/cdk/collections';
import { environment } from '../../../environments/environment.prod';
declare var $;
import swal from 'sweetalert2';

@Component({
  selector: 'app-user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.scss']
})
export class UserManageComponent implements OnInit {
  displayedColumns: string[] = [
    "select",
    "id",
    "image",
    "name",
    "email",
    "phone",
    "status",
    "action",
  ];
  dataSource;
  offset = 0;
  limit = 10;
  sortby = "name";
  direction = "asc";
  userListing;
  length;
  reqData;
  search = "";
  item_id;
  selection = new SelectionModel(true, []);
  getData;

  addForm: FormGroup;
  editForm: FormGroup;
  editData;
  profileImageUrl;
  logo
  lat = '40.7604062';
  lng = '73.992990';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public formBuilder: FormBuilder,
    public adminService: AdminService,
    private toastr: ToastrService
  ) {
    this.addForm = formBuilder.group({
      name: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required])],
      phone: [null, Validators.compose([Validators.required])],
      // zipCode: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])],
    });
    this.editForm = formBuilder.group({
      name: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required])],
      phone: [null, Validators.compose([Validators.required])],
      // zipCode: [null, Validators.compose([Validators.required])],
    });
    this.profileImageUrl = `${environment.baseImageRealtorsProfile}`;


  }

  ngOnInit(): void {
    this.editData = {}
    this.dataSource = [];
    this.reqData = {};
    this.getData = {};
    this.getAllDataList();
  }

  onRegistration() {
    const formData = new FormData();
    if(this.logo){
      formData.append('profileImage', this.logo);
    }
    formData.append('name', this.getData.name);
    formData.append('email', this.getData.email);
    formData.append('phone', this.getData.phone);
    // formData.append('zipCode', this.getData.zipCode);
    formData.append('password', this.getData.password);
    // formData.append('lat', this.lat);
    // formData.append('lng', this.lng);

    this.adminService.AddUser(formData).subscribe(
      (data) => {
        console.log(data);
        if (data.code === 201) {
          $("#AddModal").modal("hide");
          this.addForm.reset()
          this.ngOnInit()
          this.logo = ''
          this.toastr.success("Added successfully", "Success");
          this.getAllDataList();
        }
      },
      (err) => {
        console.log(err);
        var msg= err.message.message
        if (err.status >= 404) {
          console.log("Some error occured",err);
          this.toastr.error(msg, "Error");
        } else {

          this.toastr.error(msg, "Error");
          console.log("Internet Connection Error",err);
        }
      }
    );
  }
async  openEditModal(data){
    this.editData  = {}
    this.editData = data
    this.editData.password = ''
    console.log('this.editData==================', this.editData)


    $('#EditModal').modal('show')

  }
  onEditProfile() {

    const formData = new FormData();
    if(this.logo){
      formData.append('profileImage', this.logo);
    }
    formData.append('user_id', this.editData._id);
    formData.append('name', this.editData.name);
    formData.append('phone', this.editData.phone);
    // formData.append('zipCode', this.editData.zipCode);
    if(this.editData.password){
    formData.append('password', this.editData.password);
  }
    // formData.append('lat', this.lat);
    // formData.append('lng', this.lng);


    this.adminService.EditUser(formData).subscribe(
      (data) => {
        console.log(data);
        if (data.code === 200) {
          $("#EditModal").modal("hide");
          this.editForm.reset()
          this.logo = ''
          this.toastr.success("Edit successfully", "Success");
          this.getAllDataList();
        }
      },
   (err) => {
        console.log(err);
        var msg= err.message.message
        if (err.status >= 404) {
          console.log("Some error occured",err);
          this.toastr.error(msg, "Error");
        } else {

          this.toastr.error(msg, "Error");
          console.log("Internet Connection Error",err);
        }
      }
    );
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.forEach((row) => this.selection.select(row._id));
  }

  checkboxLabel(row): string {
    if (!row) {
      return `${this.isAllSelected() ? "select" : "deselect"} all`;
    }
    return `${this.selection.isSelected(row) ? "deselect" : "select"} row ${
      row.position + 1
    }`;
  }

  applyFilter(value) {
    // console.log('----------val',value)
    const obj = {
      offset: this.offset,
      limit: this.limit,
      sortby: this.sortby,
      direction: this.direction,
      search: value,
    };
    this.search = value;
    this.GetDataList(obj);
  }

  sortData(event) {
    console.log("event====================sortdata", event);

    const obj = {
      offset: this.offset,
      limit: this.limit,
      sortby: event.active,
      direction: event.direction,
      search: this.search,
    };
    this.sortby = event.active;
    this.direction = event.direction;
    this.GetDataList(obj);
  }

  onPageFired(event) {
    const obj = {
      offset: (event.pageIndex * event.pageSize).toString(),
      limit: event.pageSize,
      sortby: this.sortby,
      direction: this.direction,
      search: this.search,
    };
    this.offset = event.pageIndex * event.pageSize;
    this.limit = event.pageSize;
    this.GetDataList(obj);
  }

  getAllDataList() {
    const obj = {
      offset: this.offset,
      limit: this.limit,
      sortby: this.sortby,
      direction: this.direction,
      search: this.search,
    };
    this.GetDataList(obj);
  }

  GetDataList(obj) {
    console.log('obj===================',obj)
    this.adminService.UserListData(obj).subscribe(
      (data) => {
        console.log(data);
        if (data.code === 200) {
          this.length = data.response_data.count;
          this.reqData = JSON.stringify(data.response_data.data);
          this.userListing = JSON.parse(this.reqData);
          console.log("reqData", this.userListing);
          this.dataSource = this.userListing;
        }
      },
      (err) => {
        console.log(err);
        if (err.status === 404) {
          this.dataSource = [];
          console.log("Some error occured");
          // this.toastr.error("Some error occured, please try again!!", "Error");
          console.log("Internet Connection Error");
        }
      }
    );
  }

  deleteItem(id) {
    swal
      .fire({
        title: "Are you sure?",
        text: "You will not be able to recover this records!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, keep it",
      })
      .then((result) => {
        if (result.value) {
          const obj = {
            user_id: id,
          };
          this.adminService.DeleteUser(obj).subscribe(
            (data) => {
              console.log(data);
              if (data.code === 200) {
                this.toastr.success("Record deleted successfully", "Success");
                this.getAllDataList();
              }
            },
            (err) => {
              console.log(err.status);
              if (err.status >= 404) {
                console.log("Some error occured");
              } else {
                // this.toastr.error(
                //   "Some error occured, please try again!!",
                //   "Error"
                // );
                console.log("Internet Connection Error");
              }
            }
          );
        }
      });
  }

  changeStatus(data) {
    var status: boolean
    if(data.isActive){
      status = false
    }else{
      status = true
    }
    let obj = {
      _id: data._id,
      isActive: status,
      schemaName: 'user',
    };
      console.log('reqbody==================', obj)

    this.adminService.changeStatusAllUsers(obj).subscribe(
      (data) => {
        console.log(data);
        if (data.code === 200) {
          this.toastr.success("Status change successfully", "Success");
          this.getAllDataList();
        }
      },
   (err) => {
        console.log(err);
        var msg= err.message.message
        if (err.status >= 404) {
          console.log("Some error occured",err);
          this.toastr.error(msg, "Error");
        } else {

          this.toastr.error(msg, "Error");
          console.log("Internet Connection Error",err);
        }
      }
    );
  }
  multiDelete() {
    if (this.selection.selected.length > 0) {
      console.log(this.selection.selected);

      swal
        .fire({
          title: "Are you sure?",
          text: "You want to change the status of selected list!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, change it!",
          cancelButtonText: "No, keep it",
        })
        .then((result) => {
          if (result.value) {
            const obj = {
              user_id_arr: this.selection.selected,
            };
            this.adminService.DeleteMultipleUser(obj).subscribe(
              (data) => {
                console.log(data);
                if (data.code === 200) {
                  this.toastr.success("Records deleted successfully", "Success");
                  this.selection.clear();
                  this.getAllDataList();
                }
              },
              (err) => {
                console.log(err.status);
                if (err.status >= 404) {
                  console.log("Some error occured");
                } else {
                  // this.toastr.error(
                  //   "Some error occured, please try again!!",
                  //   "Error"
                  // );
                  console.log("Internet Connection Error");
                }
              }
            );
          }
        });
    } else {
      this.toastr.warning("Please Select the at least one row.");
      return;
    }
  }
  readURL(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      // console.log('file ',file.size);
      if (
        file.type !== 'image/jpeg' &&
        file.type !== 'image/png' &&
        file.type !== 'image/jpg'
      ) {
        this.toastr.warning('Please upload image file')
        return;
      }

      const reader = new FileReader();

      // reader.onload = (e) => (this.userImageSrc = reader.result);

      reader.onloadend = (loadEvent) => {
        // console.log(reader)
        const mainImage = reader.result;
        this.logo = file;
      };

      reader.readAsDataURL(file);
    }
  }
}
