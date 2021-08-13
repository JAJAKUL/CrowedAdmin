import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  selector: 'app-room-manage',
  templateUrl: './room-manage.component.html',
  styleUrls: ['./room-manage.component.scss']
})
export class RoomManageComponent implements OnInit {
  @ViewChild('videoPlayer') videoplayer: ElementRef;

  displayedColumns: string[] = [
    "select",
    "id",
    "name",
    "image",
    "video",
    "image_360_degree",
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
  logo;
  roomVideo;
  roomDegree;
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
    });
    this.editForm = formBuilder.group({
      name: [null, Validators.compose([Validators.required])],
    });
    this.profileImageUrl = `${environment.baseImageRoom}`;


  }

  ngOnInit(): void {
    this.editData = {}
    this.dataSource = [];
    this.reqData = {};
    this.getData = {};
    this.getAllDataList();
  }
  toggleVideo(event: any) {
    // this.videoplayer.nativeElement.play();
    this.videoplayer?.nativeElement.play();
}

  onRegistration() {
    const formData = new FormData();
    if(this.logo){
      formData.append('image', this.logo);
    }
    if(this.roomVideo){
      formData.append('video', this.roomVideo);
    }
    if(this.roomDegree){
      formData.append('image_360_degree', this.roomDegree);
    }
    formData.append('name', this.getData.name);

    this.adminService.AddRoom(formData).subscribe(
      (data) => {
        console.log(data);
        if (data.code === 201) {
          $("#AddModal").modal("hide");
          this.addForm.reset()
          this.ngOnInit()
          this.logo = ''
          this.roomVideo = ''
          this.roomDegree = ''
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
    console.log('this.editData==================', this.editData)


    $('#EditModal').modal('show')

  }
  onEditProfile() {

    const formData = new FormData();
    if(this.logo){
      formData.append('image', this.logo);
    }
    if(this.roomVideo){
      formData.append('video', this.roomVideo);
    }
    if(this.roomDegree){
      formData.append('image_360_degree', this.roomDegree);
    }
    formData.append('room_id', this.editData._id);
    formData.append('name', this.editData.name);


    this.adminService.EditRoom(formData).subscribe(
      (data) => {
        console.log(data);
        if (data.code === 200) {
          $("#EditModal").modal("hide");
          this.editForm.reset()
          this.logo = ''
          this.roomVideo = ''
          this.roomDegree = ''
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
    this.adminService.RoomListData(obj).subscribe(
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
            room_id: id,
          };
          this.adminService.DeleteRoom(obj).subscribe(
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
      schemaName: 'room',
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
              room_id_arr: this.selection.selected,
            };
            this.adminService.DeleteMultipleRoom(obj).subscribe(
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
  readURLDegree(event) {
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
        this.roomDegree = file;
      };

      reader.readAsDataURL(file);
    }
  }
  readURLVideo(event) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      // console.log('file ',file.size);
      if (
        file.type !== 'video/mp4'
      ) {
        this.toastr.warning('Please upload mp4 file')
        return;
      }

      const reader = new FileReader();

      // reader.onload = (e) => (this.userImageSrc = reader.result);

      reader.onloadend = (loadEvent) => {
        // console.log(reader)
        const mainImage = reader.result;
        this.roomVideo = file;
      };

      reader.readAsDataURL(file);
    }
  }
}
