import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DescriptionComponent } from './views/description/description.component';
import { FileListComponent } from './views/file-list/file-list.component';
import { UploadTestComponent } from './views/upload-test/upload-test.component';
import { UploadComponent } from './views/upload/upload.component';

const routes: Routes = [
  { path: 'home', component: DescriptionComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'upload', component: UploadComponent },
  { path: 'file-list', component: FileListComponent },
  { path: 'upload-test', component: UploadTestComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
