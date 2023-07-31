import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
// import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class EmployeeSummaryReportsService {

   public  PeriodFrom='1900/01/01';
   public PeriodTo='2022/05/01';

  private API_URL: string = environment.API_URL;
  private token: string = environment.loginToken;

  constructor(private http: HttpClient) { }
  
  private auth_token = localStorage.getItem('token');
  private headers = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
    'Authorization': `Bearer ${this.auth_token}`,
    "Accept": "*/*",
        "Access-Control-Allow-Origin": "*",
            // 'Access-Control-Allow-Origin': '192.168.2.105'

  });
  private requestOptions = { headers: this.headers };

    //For Get DailyAttendanceSummary Data 
  public GetDailyAttendanceSummary(fromDate:any, DateTo:any): Observable<any> {
debugger;
    return this.http.get<any>(this.API_URL + "/api/GetDailyAttendanceSummary/" + this.token+'?PeriodFrom='+fromDate +'&PeriodTo='+DateTo, this.requestOptions );
    
  }

  //For Get MonthlyAttendanceSummary Data 
  public GetMonthlyAttendanceSummary(fromMonth:any, monthTo:any): Observable<any> {
debugger;
    return this.http.get<any>(this.API_URL + "/api/GetMonthlyAttendanceSummary/" + this.token+'?PeriodFrom='+fromMonth +'&PeriodTo='+monthTo, this.requestOptions);
    // return this.http.get(this.API_URL + "/api/GetMonthlyAttendanceSummary/" + this.token+'?PeriodFrom='+fromMonth +'&PeriodTo='+monthTo, this.requestOptions);
  }

  //For Get AbsenteeismReportSummary Data 
  public GetAbsenteeismReportSummary(PeriodFrom:any,PeriodTo:any): Observable<any> {

    return this.http.get<any>(this.API_URL + "/api/GetAbsenteeismReportSummary/" + this.token+'?PeriodFrom='+PeriodFrom +'&PeriodTo='+PeriodTo, this.requestOptions);
  }

  //For Get LatenessReportSummary Data 
  public GetLatenessReportSummary(PeriodFrom:any,PeriodTo:any): Observable<any> {

    return this.http.get<any>(this.API_URL + "/api/GetLatenessReportSummary/" + this.token+'?PeriodFrom='+PeriodFrom +'&PeriodTo='+PeriodTo, this.requestOptions);
  } 

  
//For Get All LatenessReportDetails Data
public getLatenessReportDetails(PeriodFrom:any,PeriodTo:any): Observable<any> {
  debugger;
      return this.http.get<any>(this.API_URL + "/api/GetLatenessReportDetails/" + this.token+'?PeriodFrom='+PeriodFrom +'&PeriodTo='+PeriodTo, this.requestOptions);
    }
}
