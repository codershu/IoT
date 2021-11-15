import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private apiRoute = "https://localhost:5001/iot";
  // private apiRoute = "https://iot-cloud-server.azurewebsites.net/iot";

  public uploadFileToBlob(location: string, fileToUpload: FormData){
    return this.http.post<any>(`${this.apiRoute}/UploadFileToBlob/${location}`, fileToUpload, {reportProgress: true, observe: 'events'});
  }

  public getAllContainers(){
    return this.http.get<any>(`${this.apiRoute}/GetAllContainers`);
  }

  public getAllBlobsInContainer(contianerName: string){
    return this.http.get<any>(`${this.apiRoute}/GetAllBlobsInContainer/${contianerName}`);
  }

  public getBlobs(){
    return this.http.get<any>(`${this.apiRoute}/getBlobs`);
  }

  public getAllFileInBlob(){

  }


  public testApi(){
    return this.http.get<any>(`${this.apiRoute}/weatherforecast`);
  }
}
