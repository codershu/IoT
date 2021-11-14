import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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

  location: string = "vancouver";
  fileName: string = "";
  zoom: number = 14;
  lat: number = 48.4634;
  lng: number = 123.3117;

  constructor(private apiService: ApiService) { }
  
  ngAfterViewInit(): void {
    
  }

  ngOnInit(): void {
    this.getLocation();
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

  getLocation(){
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
            console.log("check name", response);
            this.location = response.results[0].formatted_address.split(",")[1].replace(" ", "");
            console.log("city name", this.location)
            this.locationInfoReady = true;
          });

      })
    }
  
  }
}
