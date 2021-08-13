import { Component, OnInit } from "@angular/core";
import { AdminService } from "../shared/service/admin.service";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: 'app-terms-condition',
  templateUrl: './terms-condition.component.html',
  styleUrls: ['./terms-condition.component.scss']
})
export class TermsConditionComponent implements OnInit {

  reqData;
  getData;

  constructor(
    public adminService: AdminService,
    private toastr: ToastrService
  ) {




  }

  ngOnInit(): void {
    this.getData ={}
    this.GetContentListData();
  }





  GetContentListData() {
    this.adminService.GetAllContent().subscribe(
      (data) => {
        console.log(data);
        if (data.docs.length) {
          this.reqData = data.docs;
          var getData =  this.reqData.find(x => x.content_type === 'terms_and_conditions');
          this.getData.content = getData.content
        }
      },
      (err) => {
        console.log(err);
        if (err.status === 404) {
          console.log("Some error occured");
          // this.toastr.error("Some error occured, please try again!!", "Error");
          console.log("Internet Connection Error");
        }
      }
    );
  }

  updateContent() {
    var obj = {
      content_type : 'terms_and_conditions',
      content : this.getData.content
    }
    // AddContent
    this.adminService.UpdateContent(obj).subscribe(
      (data) => {
        console.log(data);
        if (data.code === 200) {
          this.toastr.success('Data update successfully','success')
          // this.ngOnInit()
        }
      },
      (err) => {
        console.log(err);
        if (err.status === 404) {
          console.log("Some error occured");
          // this.toastr.error("Some error occured, please try again!!", "Error");
          console.log("Internet Connection Error");
        }
      }
    );
  }


}
