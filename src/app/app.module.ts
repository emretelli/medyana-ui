import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './modules/material/material.module';
import { PatientListComponent } from './components/patient-list/patient-list.component';
import { PatientDetailDialogComponent } from './components/patient-detail-dialog/patient-detail-dialog.component';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { ApproveDialogComponent } from './common/approve-dialog/approve-dialog.component';
import { PatientFilterPipe } from './pipes/patient-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PatientListComponent,
    PatientDetailDialogComponent,
    ApproveDialogComponent,
    PatientFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    PatientDetailDialogComponent,
    ApproveDialogComponent
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
