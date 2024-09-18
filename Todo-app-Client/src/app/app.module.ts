import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Required for ngModel
import { HttpClientModule } from '@angular/common/http'; // Required for API calls

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { TaskDeleteComponent } from './task-delete/task-delete.component';
import { TaskEditFormComponent } from './task-edit-form/task-edit-form.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    TaskFormComponent,
    TaskDeleteComponent,
    TaskEditFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, // Required for ngModel binding
    HttpClientModule // Required for API calls
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

