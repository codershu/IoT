import { Component, OnInit } from '@angular/core';
import { blob, container } from 'src/app/models/models';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.css']
})
export class FileListComponent implements OnInit {

  selectedContainer: container | undefined;
  selectedContainerName: string = "";
  containers: container[] = [];
  files: blob[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getAllContainers();
  }

  onContainerChange(event: any){
    // console.log("selected container", this.selectedContainer);
    if(this.selectedContainer){
      this.selectedContainerName = this.selectedContainer.name;
      this.getAllBolobsInContainer();
    }
  }

  getAllContainers(){
    this.apiService.getAllContainers().subscribe(response => {
      // console.log("all containers", response)
      this.containers = response;
    })
  }

  getAllBolobsInContainer(){
    this.apiService.getAllBlobsInContainer(this.selectedContainerName).subscribe(response => {
      // console.log("all blobs in container", response)
      this.files = response;
    })
  }
}
