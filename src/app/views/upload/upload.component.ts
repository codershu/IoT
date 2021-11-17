import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import '@cds/core/file/register.js';
import { ApiService } from 'src/app/service/api.service';
declare const google: any;

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit, AfterViewInit {

  processingFileInProgress: boolean = false;
  locationInfoReady: boolean = false;

  map: any;
  @ViewChild('mapElement') mapElement: any;

  @ViewChild('myInput')
  myInput!: ElementRef;

  location: string = "victoria";
  fileName: string = "";
  zoom: number = 14;
  lat: number = 48.4634;
  lng: number = 123.3117;
  uploadedFile: any;
  uploading: boolean = false;
  successfulUpload: boolean = false;
  initialLoading: boolean = false;

  constructor(private apiService: ApiService) { }
  
  ngAfterViewInit(): void {
    
  }

  ngOnInit(): void {
    this.getLocation();
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

          this.myInput.nativeElement.value = "";
          this.successfulUpload =true;
        })
      }, 1000);

    }
  }

  getLocation(){
    this.initialLoading = false;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        const myPosition = { lat: this.lat, lng: this.lng };
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 14,
          center: myPosition,
          scrollwheel: false
        });
        var marker = new google.maps.Marker({
            position: myPosition,
            map: map,
            label: "You Are Here"
        });

        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({location: myPosition})
          .then((response: any) => {
            // console.log("check name", response);
            this.location = response.results[0].formatted_address.toLocaleLowerCase().split(",")[1].replace(" ", "");
            // console.log("city name", this.location)
            this.locationInfoReady = true;
            this.initialLoading = true;
          });

      })
    }
  }

  onLocationChange(){
    this.locationValidation();
  }

  locationValidation(){
    if(this.location == null || this.location.length < 3){
      this.locationInfoReady = false;
      return
    }

    const regex = new RegExp(/^[a-zA-Z0-9-]+$/g);
    this.locationInfoReady = regex.test(this.location);
    // console.log("validation result", regex.test(this.location))
  }
}
