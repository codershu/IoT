import { Component, OnInit } from '@angular/core';
import '@cds/core/file/register.js';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  processingFileInProgress: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onFileChange(event: any){

  }
}
