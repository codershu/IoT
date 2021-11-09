import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-test',
  templateUrl: './upload-test.component.html',
  styleUrls: ['./upload-test.component.css']
})
export class UploadTestComponent implements OnInit {

  processingFileInProgress: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onFileChange(event: any){

  }
}
