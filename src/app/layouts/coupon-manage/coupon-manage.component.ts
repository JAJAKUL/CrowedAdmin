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
  selector: 'app-coupon-manage',
  templateUrl: './coupon-manage.component.html',
  styleUrls: ['./coupon-manage.component.scss']
})
export class CouponManageComponent implements OnInit {
  displayedColumns: string[] = [
    "select",
    "id",
    "promoCode",
    "discountAmount",
    "discountType",
    "fromDate",
    "toDate",
    "status",
    "action",
  ];
  dataSource;
  offset = 0;
  limit = 10;
  sortby = "fromDate";
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
  menuImageUrl;
  menuImage
  categoryList;
  restaurantList;
  date: Date = new Date();
  settings = {
      bigBanner: true,
      timePicker: false,
      format: 'dd-MM-yyyy',
      defaultOpen: false
  };
  campaignOne: FormGroup;
  campaignTwo: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public formBuilder: FormBuilder,
    public adminService: AdminService,
    private toastr: ToastrService
  ) {
    this.addForm = formBuilder.group({
      promoCode: [null, Validators.compose([Validators.required])],
      discountAmount: [null, Validators.compose([Validators.required])],
      discountType: [null, Validators.compose([Validators.required])],
      // fromDate: [null, Validators.compose([Validators.required])],
      // toDate: [null, Validators.compose([Validators.required])],
      // restaurantId: [null, Validators.compose([Validators.required])],
    });
    this.editForm = formBuilder.group({
      promoCode: [null, Validators.compose([Validators.required])],
      discountAmount: [null, Validators.compose([Validators.required])],
      // toDate: [null, Validators.compose([Validators.required])],
      // fromDate: [null, Validators.compose([Validators.required])],
      discountType: [null, Validators.compose([Validators.required])],
      // restaurantId: [null, Validators.compose([Validators.required])],
    });

    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

    this.campaignOne = new FormGroup({
      start: new FormControl(new Date(year, month, 13)),
      end: new FormControl(new Date(year, month, 16))
    });

    this.campaignTwo = new FormGroup({
      start: new FormControl(new Date()),
      end: new FormControl(new Date())
    });



  }

  ngOnInit(): void {
    this.editData = {}
    this.dataSource = [];
    this.reqData = {};
    this.getData = {};
    this.getData.restaurantId = ''
    this.getData.discountType = ''
    this.PromoCodeAllList();
    // this.getActiveRestaurantList()
  }
  dateRangeChange(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement) {
    this.getData.fromDate = dateRangeStart.value
    this.getData.toDate = dateRangeEnd.value
    console.log(dateRangeStart.value);
    console.log(dateRangeEnd.value);
  }
  dateRangeChange1(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement) {
    this.editData.fromDate = dateRangeStart.value
    this.editData.toDate = dateRangeEnd.value
    console.log(dateRangeStart.value);
    console.log(dateRangeEnd.value);
  }


  addPromoCode() {
    if (!this.getData.toDate) {
      this.toastr.warning("Please select the date",'Warning');
      return
  }


    const formData = new FormData();
    formData.append('promoCode', this.getData.promoCode);
    formData.append('discountAmount', this.getData.discountAmount);
    formData.append('discountType', this.getData.discountType);
    formData.append('fromDate', this.getData.fromDate);
    formData.append('toDate', this.getData.toDate);
    // formData.append('promoCodeAmountMaxCap', this.getData.promoCodeAmountMaxCap);
    // formData.append('promoCodeAmountMinCap', this.getData.promoCodeAmountMinCap);
    formData.append('promoCodeDesciption', this.getData.promoCodeDesciption);
    // formData.append('restaurantId', this.getData.restaurantId);

    this.adminService.AddPromoCode(formData).subscribe(
      (data) => {
        console.log(data);
        if (data.code === 201) {
          $("#promoModal").modal("hide");
          this.toastr.success("Added successfully", "Success");
          this.menuImage = ''
          this.getData = {}
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
    if(data.restaurantId){
      this.editData.restaurantId  = data.restaurantId._id
    }else{
      this.editData.restaurantId = ''
    }
    this.campaignOne.get('start').setValue(new Date(this.editData.fromDate));
    this.campaignOne.get('end').setValue(new Date(this.editData.toDate));
    console.log('this.editData==================', this.editData)
    $('#promocodeEditModal').modal('show')

  }
  editPromoCode() {
    if (!this.editData.toDate) {
      this.toastr.warning("Please select the date",'Warning');
      return
  }
//     if (parseInt(this.editData.promoCodeAmountMinCap) > parseInt(this.editData.promoCodeAmountMaxCap)) {
//       this.toastr.warning("Minimum order amount not grater than maximum order amount",'Warning');
//       return
//   }
//   if (parseInt(this.editData.discountAmount) > (parseInt(this.editData.promoCodeAmountMinCap)|| parseInt(this.editData.promoCodeAmountMaxCap))) {
//     this.toastr.warning("Discount value not grater than minimum order and  maximum order amount",'Warning');
//     return
// }
    const formData = new FormData();

    formData.append('promoCode', this.editData.promoCode);
    formData.append('discountAmount', this.editData.discountAmount);
    formData.append('discountType', this.editData.discountType);
    formData.append('fromDate', this.editData.fromDate);
    formData.append('toDate', this.editData.toDate);
    // formData.append('promoCodeAmountMaxCap', this.editData.promoCodeAmountMaxCap);
    // formData.append('promoCodeAmountMinCap', this.editData.promoCodeAmountMinCap);
    formData.append('promoCodeDesciption', this.editData.promoCodeDesciption);
    // formData.append('restaurantId', this.editData.restaurantId);
    formData.append('promo_id', this.editData._id);


    this.adminService.EditPromoCode(formData).subscribe(
      (data) => {
        console.log(data);
        if (data.code === 200) {
          $("#promocodeEditModal").modal("hide");
          this.toastr.success("Edit successfully", "Success");
          this.menuImage = ''
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
    this.GetPromoCodeList(obj);
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
    this.GetPromoCodeList(obj);
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
    this.GetPromoCodeList(obj);
  }

  PromoCodeAllList() {
    const obj = {
      offset: this.offset,
      limit: this.limit,
      sortby: this.sortby,
      direction: this.direction,
      search: this.search,
    };
    this.GetPromoCodeList(obj);
  }

  GetPromoCodeList(obj) {
    console.log('obj===================',obj)
    this.adminService.GetPromoCodeListData(obj).subscribe(
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

  deletePromoCode(id) {
    swal
      .fire({
        title: "Are you sure?",
        text: "You will not be able to recover this Promo Code!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, keep it",
      })
      .then((result) => {
        if (result.value) {
          const obj = {
            promo_id: id,
          };
          this.adminService.DeletePromoCode(obj).subscribe(
            (data) => {
              console.log(data);
              if (data.code === 200) {
                this.toastr.success("Promo Code deleted successfully", "Success");
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
      schemaName: 'coupon',
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
  multiDelete() {
    if (this.selection.selected.length > 0) {
      console.log(this.selection.selected);

      swal
        .fire({
          title: "Are you sure?",
          text: "You want to change the status of selected Promo Code!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, change it!",
          cancelButtonText: "No, keep it",
        })
        .then((result) => {
          if (result.value) {
            const obj = {
              promo_id_arr: this.selection.selected,
            };
            this.adminService.DeleteMultiplePromoCode(obj).subscribe(
              (data) => {
                console.log(data);
                if (data.code === 200) {
                  this.toastr.success("Promo Code deleted successfully", "Success");
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
