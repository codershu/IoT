import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-upload-test',
  templateUrl: './upload-test.component.html',
  styleUrls: ['./upload-test.component.css']
})

export class UploadTestComponent implements OnInit {

  @ViewChild('myInputTest')
  myInputTest!: ElementRef;

  processingFileInProgress: boolean = false;
  locationInfoReady: boolean = false;
  location: string = "victoria";
  fileName: string = "";
  uploadedFile: any;
  uploading: boolean = false;
  successfulUpload: boolean = false;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }

  onFileChange(event: any){
    this.uploadedFile = <File>event.target.files[0];
    this.successfulUpload = false;
  }

  submit(){
    if (this.uploadedFile) {
      this.uploading = true;
      this.location = this.location.toLocaleLowerCase().replace(" ", "");
      this.fileName = this.uploadedFile.name;
      const formData = new FormData();
      formData.append("thumbnail", this.uploadedFile);
      // console.log("before upload", this.fileName);
      setTimeout(() => {
        this.successfulUpload = false;
        this.apiService.uploadFileToBlob(this.location, formData).subscribe(response => {
          // console.log("after upload", response);
          this.uploading = false;
          this.uploadedFile = null;

          this.myInputTest.nativeElement.value = "";
          this.successfulUpload =true;
        })
      }, 1000);

    }
  }

  onLocationChange(){
    this.locationInfoReady = !(!this.location || this.location.length == 0);
    console.log("has location?", this.locationInfoReady)
  }

}
