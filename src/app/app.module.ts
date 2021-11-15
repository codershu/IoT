import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DescriptionComponent } from './views/description/description.component';
import { UploadComponent } from './views/upload/upload.component';
import { UploadTestComponent } from './views/upload-test/upload-test.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FileListComponent } from './views/file-list/file-list.component';

@NgModule({
  declarations: [
    AppComponent,
    DescriptionComponent,
    UploadComponent,
    UploadTestComponent,
    FileListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
