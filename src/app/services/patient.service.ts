import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators'; 
import { environment } from 'src/environments/environment';
import { Patient } from '../interfaces/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private patientUrl = environment.apiUrl + 'api/patient';  
  
  constructor(private http: HttpClient) { }  
  
  getPatients(): Observable<Patient[]> {  
    return this.http.get<Patient[]>(this.patientUrl)  
      .pipe(  
        catchError(this.handleError)  
      );  
  }  
  
  getPatient(id: number): Observable<Patient> {  
    const url = `${this.patientUrl}/${id}`;  
    return this.http.get<Patient>(url)  
      .pipe(  
        catchError(this.handleError)  
      );  
  }  
  
  deletePatient(id: number): Observable<{}> {  
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });  
    const url = `${this.patientUrl}/${id}`;  
    return this.http.delete<Patient>(url, { headers: headers })  
      .pipe(  
        catchError(this.handleError)  
      );  
  }  
  
  updatePatient(patient: Patient): Observable<Patient> {  
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });  
    const url = `${this.patientUrl}/${patient.id}`;  
    return this.http.put<Patient>(url, patient, { headers: headers })  
      .pipe(  
        map(() => patient),  
        catchError(this.handleError)  
      );  
  }  
  
  private handleError(err:any) {  
    let errorMessage: string;  
    if (err.error instanceof ErrorEvent) {  
      errorMessage = `An error occurred: ${err.error.message}`;  
    } else {  
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;  
    }  
    console.error(err);  
    return throwError(errorMessage);  
  }  
   
}
