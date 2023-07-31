import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
// import { AbsenteeismReportDetail } from 'src/app/Model/Absentee-Reports-Model/Absent-Details-Report-Model/Attendance-Detail-Model';
@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  

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

  //For Get All AbsenteeismReportDetail Data
  
  public getAbsenteeismReportDetail(): Observable<any> {
    
    return this.http.get<any>(this.API_URL + "/api/GetAbsenteeismReportDetail/" + this.token, this.requestOptions);
    
  }

}
