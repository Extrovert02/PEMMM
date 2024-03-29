import {Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {SwalService} from "../../Services/AleartPopUp/swal.service";
import {Loan} from "../../Model/loan";
import {PageEvent} from "@angular/material/paginator";
import {LoanService} from "../../Services/loan.service";
// import {InterestRateValidator} from "../util/custom-field-validator";

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css']
})
export class LoanComponent implements OnInit {
  @ViewChild('closeBtn') closeBtn: ElementRef;
  @ViewChild('closeupdatebtn') closeupdatebtn: any;
  @ViewChild('closedeletebtn') closedeletebtn: any;
  public searchFilter: any = '';
  public nameSearch: string = '';
  errorMessage = false;
  interestRateErrorMsg = '';

  interestTypIdData: any[] = []
  glaccountNumberData: any[] = []

  // searchedKeyword: string;
  searchKey: string = "";

  // MatPaginator Inputs
  // length = 10;
  static pageSize = 10;
  static pageSizeOptions: number[] = [5, 10, 25, 100];

  // MatPaginator Output
  pageEvent: PageEvent;

  loanForm: FormGroup;
  editData: any;
  delData: any;
  desobj: Loan = new Loan();
  //DesignationId: any;
  // designationData: Array<any> = [];
  loanData: any;

  // API_URL: string = environment.API_URL;
  // token: string = environment.loginToken;
  // childModal: any;
  count: number = 0;
  tablesize: number = 15;
  tablesizes: any = [10, 20, 50, 100, 150, 200, 250]
  public page: any;
  constructor(private service: LoanService, private formBuilder: FormBuilder, private swalService: SwalService) {
    //Designation Form
    this.loanForm = this.formBuilder.group({
      companyId: new FormControl('', [Validators.required]),
      divisionId: new FormControl('', [Validators.required]),
      departmentId: new FormControl('', [Validators.required]),
      loanTypeId: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      interestRate: new FormControl('', [Validators.required]),
      interestTypeId: new FormControl('', [Validators.required]),
      glaccountNumber: new FormControl('', [Validators.required]),
      lockedBy: new FormControl('', [Validators.required]),
      lockTs: new FormControl('', [Validators.required]),
      branchCode: new FormControl('', [Validators.required])
    });
  }
  ngOnInit(): void {
    this.getAll();
    this.getInterestTypeIdData();
    this.getGlaccountNumberData();
    setTimeout(() => {
      console.log('Test')}, 300);
  }


  ngOnChanges(changes: SimpleChanges) {

  }


//#region Pagination
  onTableDataChange(event: any) {
    this.page = event;
    this.getAll();
  }
  onTableSizeChange(event: any) {
    this.tablesize = event.target.value;
    this.page = 1;
    this.getAll();
  }
//#endregion

//#region Close Modal PopUp
  private closeModal(): void {
    this.closeBtn.nativeElement.click();
  }
  private closeUpdateModal(): void {
    this.closeupdatebtn.nativeElement.click();
  }
  private closeDeleteModal(): void {
    this.closedeletebtn.nativeElement.click();
  }
//#endregion

//#region Get All Designation


  getAll() {
    this.loanData = [];
    this.service.getAll().subscribe(res => {
        if (res.data != null) {
          this.loanData = res.data;
        }
      }
    );
  }
//#endregion

  //#region Add button  click  method
  Add() {
    this.desobj.loanTypeId = this.loanForm.value.loanTypeId;
    this.desobj.description = this.loanForm.value.description;
    this.desobj.interestRate = this.loanForm.value.interestRate;
    this.desobj.interestTypeId = this.loanForm.value.interestTypeId;
    this.desobj.glaccountNumber = this.loanForm.value.glaccountNumber;

        this.service.addAndEdit(this.desobj).subscribe(res => {
          if (res.status == "Success") {
            this.swalService.SwalAlertMessage(true, "success", "Your Data Inserted Successfully.", true, false);
            this.getAll();
            this.closeModal();
          } else
            this.swalService.SwalAlertMessage(false, "error", " Something went wrong Please try again.", true, false);
        }, err => {
          console.log(err);
        });

      this.loanForm.reset();
  }
//#endregion

  //#region Edit button pancel click  method
  editLoan(desModel: Loan) {
    this.editData = desModel;

    this.loanForm.controls['loanTypeId'].setValue(desModel.loanTypeId);
    this.loanForm.controls['description'].setValue(desModel.description);
    this.loanForm.controls['interestRate'].setValue(desModel.interestRate);
    this.loanForm.controls['interestTypeId'].setValue(desModel.interestTypeId);
    this.loanForm.controls['glaccountNumber'].setValue(desModel.glaccountNumber);
    this.loanForm.controls['companyId'].setValue(desModel.companyId);
    this.loanForm.controls['divisionId'].setValue(desModel.divisionId);
    this.loanForm.controls['departmentId'].setValue(desModel.departmentId);
    this.loanForm.controls['lockedBy'].setValue(desModel.lockedBy);
    this.loanForm.controls['lockTs'].setValue(desModel.lockTs);
    this.loanForm.controls['branchCode'].setValue(desModel.branchCode);

  }

  //#endregion


  //#region  For Update Or Edit Designation

  Update() {

    this.desobj.companyId = this.loanForm.value.companyId;
    this.desobj.divisionId = this.loanForm.value.divisionId;
    this.desobj.departmentId = this.loanForm.value.departmentId;
    this.desobj.loanTypeId = this.loanForm.value.loanTypeId;
    this.desobj.description = this.loanForm.value.description;
    this.desobj.interestRate = this.loanForm.value.interestRate;
    this.desobj.interestTypeId = this.loanForm.value.interestTypeId;
    this.desobj.glaccountNumber = this.loanForm.value.glaccountNumber;
    this.desobj.lockedBy = this.loanForm.value.lockedBy;
    this.desobj.lockTs = this.loanForm.value.lockTs;
    this.desobj.branchCode = this.loanForm.value.branchCode;

    this.service.addAndEdit(this.desobj).subscribe(res => {

      if (res.status == "Success") {
        this.swalService.SwalAlertMessage(true, "Success", "Your Data Updated Successfully.", true, false);
        this.getAll();
      }
      else
        this.swalService.SwalAlertMessage(false, "error", "Somethings wents wrong. Please try again.", true, false);

      this.closeUpdateModal();
    });

    this.loanForm.reset();


  }
  //#endregion

  //#region For Delete Designation

  public DesId: any
  deleteData(desModel: string) {

    this.DesId = desModel

  }


  Delete(loanTypeId: string) {
    this.service.delete(this.DesId).subscribe(res => {
      if (res.status == "Success") {
        this.swalService.SwalAlertMessage(true, "Success", "Your Data is Deleted Successfully. ", true, false);
        this.getAll();
      }
      else
        this.swalService.SwalAlertMessage(false, "error", " You Can not Delete this Record. DesignationId Is Missing.", true, false);
      this.closeDeleteModal()
    });
  }

  getInterestTypeIdData() {
    this.service.getInterestTypeIdDropdown()
      .subscribe({
        next: resp => {
          if(resp.data !== null) {
            this.interestTypIdData = resp.data;
            console.log(this.interestTypIdData);
          }
        },
        error: err => console.error(err),
        complete: () => {

    }
      })
  }

  validateInterestRate(): boolean {
    if (!this.loanForm.controls['interestRate'].value.toString().match(/^[0-9]+(\.?[0-9]+)?$/)) {
      this.loanForm.controls['interestRate'].setValue(null);
      this.interestRateErrorMsg = "Interest Rate can only be numbers.";
      this.errorMessage = true;
      return true;
    }
    return false;
  }

  getGlaccountNumberData() {
    this.service.getGlaccountNumbers()
      .subscribe({
        next: resp => {
          if(resp.data !== null) {
            this.glaccountNumberData = resp.data;
            const list: any [] = resp.data;
            this.glaccountNumberData = list.map(d => (d.glaccountNumber + " - " + d.glaccountName))
          }
        },
        error: err => console.error(err),
        complete: () => {

    }
      })
  }

}
