import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-upload-test',
  templateUrl: './upload-test.component.html',
  styleUrls: ['./upload-test.component.css']
})

export class UploadTestComponent implements OnInit {


  processingFileInProgress: boolean = false;
  location: string = "vancouver";
  fileName: string = "";

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }

  onFileChange(event: any){
    var uploadedFile = <File>event.target.files[0];
    if (uploadedFile) {

      this.fileName = uploadedFile.name;

      const formData = new FormData();

      formData.append("thumbnail", uploadedFile);
      console.log("before upload", this.fileName);
      this.apiService.uploadFileToBlob(this.location, formData).subscribe(response => {
        console.log("after upload", response);
      })

    }
  }

  testApi(){
    this.apiService.testApi().subscribe(response => {
      console.log("test api", response)
    })
  }

}
