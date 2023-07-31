import { Component, OnInit } from '@angular/core';

import {  exportDataGrid as XLSDataGrid } from 'devextreme/excel_exporter';


import { exportDataGrid as csv, exportDataGrid as Csv } from 'devextreme/excel_exporter';

import { exportDataGrid as PDFGrid } from 'devextreme/pdf_exporter';
import { jsPDF } from 'jspdf';
import * as ExcelJS from 'exceljs';

import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver-es';
import { ReportsService } from 'src/app/Services/Reports-Services/Deduction-Reports-Service/Employee Details Service/Employee-Details-reports.service';
@Component({
  selector: 'app-absentee-details',
  templateUrl: './absentee-details.component.html',
  styleUrls: ['./absentee-details.component.css']
})
export class AbsenteeDetailsComponent implements OnInit {
  public absenteeDetailsData: any;

  constructor(private service: ReportsService) { }

  ngOnInit(): void {

    this.getAbsentee();
  }

  //#region for get Absenteeism Report Detail 
  getAbsentee() {
    this.service.getAbsenteeismReportDetail().subscribe(res => {

      if (res.data != null) {

        this.absenteeDetailsData = res.data;
              }
    })

  }
  //#endregion
 
  //#region Export to PDF , XLSX, & CSV
  onExporting(e: any) {
    //#region Export to PDF
    if (e.format == "pdf") {

      //Work for PDF
      const doc = new jsPDF();
      PDFGrid({
        jsPDFDocument: doc,
        component: e.component,
        indent: 5,
        topLeft: { x: 1, y: 15 },
      }).then(() => {
        const header = 'Employee Absentee Details Report';
        const pageWidth = doc.internal.pageSize.getWidth();
        doc.setFontSize(15);
        const headerWidth = doc.getTextDimensions(header).w;
        doc.text(header, (pageWidth - headerWidth) / 2, 20);


        doc.save('absenteeDetailsReport.pdf');
      });
    }
    //#endregion


    //#region Export to XLSX file
    else if (e.format == "xlsx") {
      //   //Work for xlsx

      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet('Employees');
      XLSDataGrid({
        component: e.component,
        worksheet,
        autoFilterEnabled: true,
        topLeftCell: { row: 4, column: 1 },
      }).then(() => {

        const headerRow = worksheet.getRow(2);
        headerRow.height = 30;
        worksheet.mergeCells(2, 1, 2, 8);

        headerRow.getCell(1).value = 'Employee Absentee Details Report';
        headerRow.getCell(1).font = { name: 'Segoe UI Light', size: 22 };
        headerRow.getCell(1).alignment = { horizontal: 'center' };
        workbook.xlsx.writeBuffer().then((buffer) => {
          saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'absenteeDetailsReport.xlsx');
        });
      });
      e.cancel = true;
    }
    //#endregion


    //#region Export to CSV file

    else {

      // const workbook = new Workbook();
      const workbook = new ExcelJS.Workbook();

      const worksheet = workbook.addWorksheet('Employees');
      //  DevExpress.excelExporter.exportDataGrid({
      Csv({
        component: e.component,
        worksheet: worksheet,
        topLeftCell: { row: 4, column: 1 }
      }).then(() => {
        const headerRow = worksheet.getRow(2);
        headerRow.height = 30;
        worksheet.mergeCells(2, 1, 2, 8);

        headerRow.getCell(1).value = 'Employee Absentee Details Report';
        headerRow.getCell(1).font = { name: 'Segoe UI Light', size: 22 };
        headerRow.getCell(1).alignment = { horizontal: 'center' };
        workbook.csv.writeBuffer().then((buffer) => {

          saveAs(new Blob([buffer], { type: "application/octet-stream" }), "absenteeDetailsReport.csv");
        });
      });

      e.cancel = true;
    }
    //#endregion


  }
  //#endregion
}
