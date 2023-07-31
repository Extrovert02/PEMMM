import { Component, OnInit } from '@angular/core';


import { exportDataGrid, exportDataGrid as XLSDataGrid } from 'devextreme/excel_exporter';
import { exportDataGrid as csv, exportDataGrid as Csv } from 'devextreme/excel_exporter';
import { exportDataGrid as PDFGrid } from 'devextreme/pdf_exporter';
import { jsPDF } from 'jspdf';
import * as ExcelJS from 'exceljs';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver-es';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeSummaryReportsService } from 'src/app/Services/Reports-Services/Employee Summary Service/employee-summary-reports.service';
@Component({
  
 selector: 'app-lateness-reports',
 templateUrl: './lateness-reports.component.html',
 styleUrls: ['./lateness-reports.component.css']
})
export class LatenessReportsComponent implements OnInit {

 public DetailsData: any;
  PeriodFrom: any;
  PeriodTo: any;
  DetailsForm: FormGroup;


  constructor(private service: EmployeeSummaryReportsService, private formBuilder: FormBuilder) {
    this.DetailsForm = this.formBuilder.group({
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required])
    }, { validator: this.dateLessThan('startDate', 'endDate') });
  }

  ngOnInit(): void {
    this.getLatenessReport();
  }

  //#region  For Get Deduction Data
  getLatenessReport() { 
    

    this.PeriodFrom = this.DetailsForm.value.startDate;
    this.PeriodTo = this.DetailsForm.value.endDate;

    this.service.getLatenessReportDetails(this.PeriodFrom, this.PeriodTo).subscribe(res => {
      debugger;
      if (res.data != null) {
        debugger
        this.DetailsData = res.data;
      }
    });
  }
  //#endregion

  // #region For Date Validation
  dateLessThan(from: string, to: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let f = group.controls[from];
      let t = group.controls[to];
      if (f.value >= t.value) {
        return {
          dates: "Date from should be less than Period Form"
        };
      }
      return {};
    }
  }
//#endregion
 
//#region Export to XLSX , PDF & CSV functionality
  onExporting(e: any) {

    //#region xport to PDF
    if (e.format == "pdf") {

      const doc = new jsPDF();
      // const lastPoint = { x: 0, y: 0 };

      PDFGrid({
        jsPDFDocument: doc,
        component: e.component,
        topLeft: { x: 1, y: 15 },

      }).then(() => {
        const header = 'Employee Lateness Report Details ';
        const pageWidth = doc.internal.pageSize.getWidth();
        doc.setFontSize(15);
        const headerWidth = doc.getTextDimensions(header).w;
        doc.text(header, (pageWidth - headerWidth) / 2, 20);

        doc.save('emp_Lateness_Report_Details.pdf');
      });
    }
    //#endregion

    //#region Export to XLSX file
    else if (e.format == 'xlsx') {
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet('Employee');

      exportDataGrid({
        component: e.component,
        worksheet,
        topLeftCell: { row: 4, column: 1 },
      }).then((cellRange) => {
        // header
        const headerRow = worksheet.getRow(2);
        headerRow.height = 30;
        worksheet.mergeCells(2, 1, 2, 8);

        headerRow.getCell(1).value = 'Employee Lateness Report Details';
        headerRow.getCell(1).font = { name: 'Segoe UI Light', size: 22 };
        headerRow.getCell(1).alignment = { horizontal: 'center' };

      }).then(() => {
        workbook.xlsx.writeBuffer().then((buffer) => {
          saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'emp_Lateness-Reports.xlsx');
        });
      });
      e.cancel = true;
    }
    //#endregion


    //#region Export to CSV file
    else {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Employees');
      Csv({
        component: e.component,
        worksheet: worksheet,
        topLeftCell: { row: 4, column: 1 },
      }).then(() => {
        // header
        const headerRow = worksheet.getRow(2);
        headerRow.height = 30;
        worksheet.mergeCells(2, 1, 2, 8);
        headerRow.getCell(1).value = 'Employee Lateness Report Details';
        headerRow.getCell(1).font = { name: 'Segoe UI Light', size: 22 };
        headerRow.getCell(1).alignment = { horizontal: 'center' };
        workbook.csv.writeBuffer().then((buffer) => {
          saveAs(new Blob([buffer], { type: "application/octet-stream" }), "emp_absenteeSummary_reports.csv");
        });
      });

      e.cancel = true;
    }
    //#endregion
  }
  //#endregion
}
