import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApproveDialogComponent } from 'src/app/common/approve-dialog/approve-dialog.component';
import { Gender, Patient } from 'src/app/interfaces/patient';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-patient-detail-dialog',
  templateUrl: './patient-detail-dialog.component.html',
  styleUrls: ['./patient-detail-dialog.component.css']
})
export class PatientDetailDialogComponent implements OnInit {
  formGroup: FormGroup;
  genders: string[] = [];
  genderTypes: any[] = [];
  isEditMode : boolean = false;
  patient: any;

  constructor(private _patientService : PatientService,
    public dialog : MatDialog,public dialogRef: MatDialogRef<PatientDetailDialogComponent>, private _formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: { patient: Patient }) {
    this.patient = data.patient;
    this.formGroup = this._formBuilder.group({
      'id': [this.patient.id, Validators.required],
      'polyclinicCode': [this.patient.polyclinicCode, [Validators.required, Validators.maxLength(4)]],
      'doctorRegistryCode': [this.patient.doctorRegistryCode, [Validators.required]],
      'doctorName': [this.patient.doctorName, [Validators.required, Validators.maxLength(50)]],
      'doctorSurname': [this.patient.doctorSurname, [Validators.required, Validators.maxLength(50)]],
      'name': [this.patient.name, [Validators.required, Validators.maxLength(50)]],
      'surname': [this.patient.surname, [Validators.required, Validators.maxLength(50)]],
      'dateOfBirth': [this.patient.dateOfBirth, Validators.required],
      'gender': [this.patient.gender, Validators.required],
      'citizenshipNumber': [this.patient.citizenshipNumber, [Validators.required]],
      'telephoneNumber': [this.patient.telephoneNumber, [Validators.required]],
      'visitationDate': [this.patient.visitationDate, Validators.required],
      'nextVisitationDate': [this.patient.nextVisitationDate],
      'doctorNote': [this.patient.doctorNote, Validators.maxLength(1000)],
    });
  }

  ngOnInit(): void {
    this.formGroup.disable();
    this.getGenders();
    console.log(this.data);
  }
  getGenders() {
    for (var gender in Gender) {
      var isValueProperty = parseInt(gender, 10) >= 0
      if (isValueProperty) {
        let genderType = {
          key : parseInt(gender),
          value : Gender[gender]
        };
        this.genderTypes.push(genderType);
      }
    }
    console.log(this.genderTypes);
  }
  close() {
    this.dialogRef.close({refresh : false});
  }
  createForm(patient: Patient) {

  }
  edit() {
    this.isEditMode = true;
    this.formGroup.enable();
  }
  delete() {
    const approveDialog = this.dialog.open(ApproveDialogComponent,{
      width :'250px',
      data: { title : "Onay" , content : "Silmek istediğinize emin misiniz!"}
    });
    approveDialog.afterClosed().subscribe(response => {
      if(response){
        this._patientService.deletePatient(this.patient.id)
        .subscribe(  
          () => this.dialogRef.close({refresh : true}),  
          (error: any) => console.error(error)
        );
      }
    })
  }
  onSubmit(patient: Patient) {
    console.log(patient);
    if(this.formGroup.valid){
      this._patientService.updatePatient(patient)
      .subscribe(
        () => this.dialogRef.close({refresh : true}),
        (error: any) => console.error(error)
      )
    }
  }
}
