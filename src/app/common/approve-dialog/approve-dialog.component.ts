import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-approve-dialog',
  templateUrl: './approve-dialog.component.html',
  styleUrls: ['./approve-dialog.component.css']
})
export class ApproveDialogComponent implements OnInit {
  title : string = "";
  content : string = "";
  constructor(public dialogRef: MatDialogRef<ApproveDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: { title:string, content:string }) { 
    this.title = data.title;
    this.content = data.content;
  }

  ngOnInit(): void {
  }
  respond(response : boolean){
    this.dialogRef.close(response);
  }
}
