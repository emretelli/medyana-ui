import { Component, OnInit } from '@angular/core';
import { Gender, Patient } from 'src/app/interfaces/patient';
import { PatientService } from 'src/app/services/patient.service';
import * as signalR from '@aspnet/signalr';  
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { PatientDetailDialogComponent } from '../patient-detail-dialog/patient-detail-dialog.component';
import { PatientFilter } from 'src/app/interfaces/patientFilter';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {
  patients : Patient[] = [];
  filteredPatients : Patient[] = [];
  genders : string[] = Object.keys(Gender);
  errorMessage : string = "";
  filterText : PatientFilter = { polyclinicCode : "", doctorNameSurname : "" , patientNameSurname : ""}; 
  constructor(private _patientService : PatientService,public dialog : MatDialog) { }

  ngOnInit(): void {  
    this.getEmployeeData();  
  
    const connection = new signalR.HubConnectionBuilder()  
      .configureLogging(signalR.LogLevel.Information)  
      .withUrl(environment.apiUrl + 'patientlistener') 
      .withAutomaticReconnect()
      .build();  
  
    connection.start().then(function () {  
      console.log('SignalR Connected!');  
    }).catch(function (err) {  
      return console.error(err.toString());  
    });  

    
  
    connection.on("Notify", () => {  
      this.getEmployeeData();  
    });  
  }  
  
  
  getEmployeeData() {  
    this._patientService.getPatients().subscribe(  
      patients => {  
        this.patients = patients;  
        console.log(this.patients);
      },  
      error => this.errorMessage = <any>error  
    );  
  }
  
  showDetails(patient:Patient){
    const patientDetailDialog = this.dialog.open(PatientDetailDialogComponent,
      {
        data: {patient: patient}
      });

      patientDetailDialog.afterClosed().subscribe(responseData => {
        if(responseData.refresh){
          this.getEmployeeData();
        }
      })
  }
}
