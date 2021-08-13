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
import { SelectionModel } from "@angular/cdk/collections";
import { environment } from "../../environments/environment.prod";
declare var $;
import swal from "sweetalert2";

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  displayedColumns: string[] = [
    "select",
    "id",
    "question",
    "answer",
    "status",
    "action",
  ];
  dataSource;
  offset = 0;
  limit = 10;
  sortby = "question";
  direction = "asc";
  userListing;
  length;
  reqData;
  search = "";
  item_id;
  selection = new SelectionModel(true, []);
  getData;
  //View Driver

  first_name;
  last_name;
  owner_name;
  email;
  phone;
  status;
  vehicle_number;
  vehicle_type;
  license_number;
  reg_number;
  vehicle_make;
  vehicleImageUrl;
  driverIdProofUrl;
  policeBackgroundUrl;
  driverLicenseUrl;
  vehicle_image;
  id_proof;
  police_background;
  driver_licence;
  addForm: FormGroup;
  editForm: FormGroup;
  editData;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public formBuilder: FormBuilder,
    public adminService: AdminService,
    private toastr: ToastrService
  ) {
    this.addForm = formBuilder.group({
      question: [null, Validators.compose([Validators.required])],
      answer: [null, Validators.compose([Validators.required])],
    });
    this.editForm = formBuilder.group({
      question: [null, Validators.compose([Validators.required])],
      answer: [null, Validators.compose([Validators.required])],
    });



  }

  ngOnInit(): void {
    this.editData = {}
    this.dataSource = [];
    this.reqData = {};
    this.getData = {};
    this.faqAllList();
  }
  addFAQ() {
    let obj = {
      question: this.getData.question,
      answer: this.getData.answer,
    };
    console.log('reqbody==================', this.getData)

    this.adminService.AddFAQ(obj).subscribe(
      (data) => {
        console.log(data);
        if (data.code === 200) {
          $("#faqModal").modal("hide");
          this.toastr.success("FAQ added successfully", "Success");
          this.ngOnInit();
        }
      },
      (err) => {
        console.log(err);
        if (err.status >= 404) {
          console.log("Some error occured",err);
        } else {
          this.toastr.error("Some error occured, please try again!!", "Error");
          console.log("Internet Connection Error",err);
        }
      }
    );
  }
  openEditModal(data){
    this.editData  = {}
    this.editData = data
    $('#faqEditModal').modal('show')

  }
  editFAQ() {
    let obj = {
      question: this.editData.question,
      answer: this.editData.answer,
      faq_id: this.editData._id,
    };
      console.log('reqbody==================', obj)

    this.adminService.EditFAQ(obj).subscribe(
      (data) => {
        console.log(data);
        if (data.code === 200) {
          $("#faqEditModal").modal("hide");
          this.toastr.success("FAQ edit successfully", "Success");
          this.ngOnInit();
        }
      },
      (err) => {
        console.log(err);
        if (err.status >= 404) {
          console.log("Some error occured",err);
        } else {
          this.toastr.error("Some error occured, please try again!!", "Error");
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
    this.GetFAQList(obj);
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
    this.GetFAQList(obj);
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
    this.GetFAQList(obj);
  }

  faqAllList() {
    const obj = {
      offset: this.offset,
      limit: this.limit,
      sortby: this.sortby,
      direction: this.direction,
      search: this.search,
    };
    this.GetFAQList(obj);
  }

  GetFAQList(obj) {
    console.log('obj===================',obj)
    this.adminService.GetFAQListData(obj).subscribe(
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

  deleteFAQ(id) {
    swal
      .fire({
        title: "Are you sure?",
        text: "You will not be able to recover this Faq!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, keep it",
      })
      .then((result) => {
        if (result.value) {
          const obj = {
            faq_id: id,
          };
          this.adminService.DeleteFAQ(obj).subscribe(
            (data) => {
              console.log(data);
              if (data.code === 200) {
                this.toastr.success("Faq deleted successfully", "Success");
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
      schemaName: 'FAQ',
    };
      console.log('reqbody==================', obj)

    this.adminService.changeStatusCategory(obj).subscribe(
      (data) => {
        console.log(data);
        if (data.code === 200) {
          this.toastr.success("Faq status change successfully", "Success");
          this.ngOnInit();
        }
      },
      (err) => {
        console.log(err);
        if (err.status >= 404) {
          console.log("Some error occured",err);
        } else {
          this.toastr.error("Some error occured, please try again!!", "Error");
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
          text: "You want to change the status of selected Faq's!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, change it!",
          cancelButtonText: "No, keep it",
        })
        .then((result) => {
          if (result.value) {
            const obj = {
              faq_id_arr: this.selection.selected,
            };
            this.adminService.DeleteMultipleFAQ(obj).subscribe(
              (data) => {
                console.log(data);
                if (data.code === 200) {
                  this.toastr.success("FAQ's deleted successfully", "Success");
                  this.selection.clear();
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
    } else {
      // this.toastr.warning("Please Select the row.");
      return;
    }
  }
}
