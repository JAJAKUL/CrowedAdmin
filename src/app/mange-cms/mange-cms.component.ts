import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import { AdminService } from "../shared/service/admin.service";
import { ToastrService } from "ngx-toastr";
import { isDataSource, SelectionModel } from "@angular/cdk/collections";
import { environment } from "../../environments/environment.prod";
declare var $;
import swal from "sweetalert2";
@Component({
  selector: 'app-mange-cms',
  templateUrl: './mange-cms.component.html',
  styleUrls: ['./mange-cms.component.scss']
})
export class MangeCmsComponent implements OnInit {
  displayedColumns: string[] = [

    "id",
    "image",
    "page_name",
    "page_heading",
    "page_description",
    "status",
    "action",
  ];
  dataSource;
  offset = 0;
  limit = 10;
  sortby = "page_name";
  direction = "asc";
  userListing;
  length;
  reqData;
  search = "";
  item_id;
  selection = new SelectionModel(true, []);
  getData;

  addMenuForm: FormGroup;
  editMenuForm: FormGroup;
  editData;
  imageUrl;
  image
  categoryList;
  restaurantList;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public formBuilder: FormBuilder,
    public adminService: AdminService,
    private toastr: ToastrService
  ) {
    this.addMenuForm = formBuilder.group({
      page_name: [null, Validators.compose([Validators.required])],
      page_heading: [null, Validators.compose([Validators.required])],
      page_description: [null, Validators.compose([Validators.required])],
    });
    this.editMenuForm = formBuilder.group({
      page_name: [null, Validators.compose([Validators.required])],
      page_heading: [null, Validators.compose([Validators.required])],
      page_description: [null, Validators.compose([Validators.required])],
    });
    this.imageUrl = `${environment.baseImageCMS}`;


  }

  ngOnInit(): void {
    this.editData = {}
    this.dataSource = [];
    this.reqData = {};
    this.getData = {};
    this.CMSAllList();

  }

  addCMS() {
    const formData = new FormData();
    if(this.image){

      formData.append('image', this.image);
    }else{
      this.toastr.warning('Please select image','Warning')
      return
    }
    formData.append('page_name', this.getData.page_name);
    formData.append('page_heading', this.getData.page_heading);
    formData.append('page_description', this.getData.page_description);

    this.adminService.AddCMS(formData).subscribe(
      (data) => {
        console.log(data);
        if (data.code === 201) {
          $("#menuModal").modal("hide");
          this.toastr.success("CMS added successfully", "Success");
          this.image = ''
          this.addMenuForm.reset();
          this.ngOnInit();
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
  openEditModal(data){
    this.editData  = {}
    this.editData = data

    console.log('this.editData==================', this.editData)
    $('#menuEditModal').modal('show')

  }
  editCMS() {

    const formData = new FormData();
    if(this.image){

      formData.append('image', this.image);
    }
    formData.append('page_name', this.editData.page_name);
    formData.append('page_heading', this.editData.page_heading);
    formData.append('page_description', this.editData.page_description);
    formData.append('cms_id', this.editData._id);


    this.adminService.EditCMS(formData).subscribe(
      (data) => {
        console.log(data);
        if (data.code === 200) {
          $("#menuEditModal").modal("hide");
          this.toastr.success("CMS edit successfully", "Success");
          this.image = ''
          this.ngOnInit();
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
    this.GetCMSList(obj);
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
    this.GetCMSList(obj);
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
    this.GetCMSList(obj);
  }

  CMSAllList() {
    const obj = {
      offset: this.offset,
      limit: this.limit,
      sortby: this.sortby,
      direction: this.direction,
      search: this.search,
    };
    this.GetCMSList(obj);
  }

  GetCMSList(obj) {
    console.log('obj===================',obj)
    this.adminService.GetCMSListData(obj).subscribe(
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

  deleteData(id) {
    swal
      .fire({
        title: "Are you sure?",
        text: "You will not be able to recover this Data!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, keep it",
      })
      .then((result) => {
        if (result.value) {
          const obj = {
            cms_id: id,
          };
          this.adminService.DeleteCMS(obj).subscribe(
            (data) => {
              console.log(data);
              if (data.code === 200) {
                this.toastr.success("Data deleted successfully", "Success");
                this.ngOnInit();
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
      schemaName: 'CMS',
    };
      console.log('reqbody==================', obj)

    this.adminService.changeStatusCategory(obj).subscribe(
      (data) => {
        console.log(data);
        if (data.code === 200) {
          this.toastr.success("Menu status change successfully", "Success");
          this.ngOnInit();
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
        this.image = file;
      };

      reader.readAsDataURL(file);
    }
  }
}
