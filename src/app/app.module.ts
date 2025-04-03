import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SaveClientComponent } from './save-client/save-client.component';
import { SaveProjectComponent } from './save-project/save-project.component';
import { ScheduleMeetingComponent } from './schedule-meeting/schedule-meeting.component';
import { ClientListComponent } from './client-list/client-list.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { MeetingListComponent } from './meeting-list/meeting-list.component';
import { MenuComponent } from './menu/menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import { EditClientComponent } from './edit-client/edit-client.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { EditMeetingComponent } from './edit-meeting/edit-meeting.component'


@NgModule({
  declarations: [
    AppComponent,
    SaveClientComponent,
    SaveProjectComponent,
    ScheduleMeetingComponent,
    ClientListComponent,
    ProjectListComponent,
    MeetingListComponent,
    MenuComponent,
    EditClientComponent,
    EditProjectComponent,
    EditMeetingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    ReactiveFormsModule, 
    ToastrModule.forRoot(),
    SweetAlert2Module.forRoot(),
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
