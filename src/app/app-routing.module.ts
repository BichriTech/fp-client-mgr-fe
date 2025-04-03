import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import path from 'path';
import { ProjectListComponent } from './project-list/project-list.component';
import { SaveClientComponent } from './save-client/save-client.component';
import { SaveProjectComponent } from './save-project/save-project.component';
import { ScheduleMeetingComponent } from './schedule-meeting/schedule-meeting.component';
import { ClientListComponent } from './client-list/client-list.component';
import { MeetingListComponent } from './meeting-list/meeting-list.component';
import { EditClientComponent } from './edit-client/edit-client.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { EditMeetingComponent } from './edit-meeting/edit-meeting.component';

const routes: Routes = [
  {path: "", component: ProjectListComponent},
  {path: "client/save", component: SaveClientComponent},
  {path: "client/edit/:id", component: EditClientComponent},
  {path: "client/project/save/:id", component: SaveProjectComponent},
  {path: "project/edit/:id", component: EditProjectComponent},
  {path: "client/meeting/schedule/:id", component: ScheduleMeetingComponent},
  {path:"meeting/edit/:id", component: EditMeetingComponent},
  {path: "clients-list", component: ClientListComponent},
  {path: "projects-list", component: ProjectListComponent},
  {path: "meetings-list", component: MeetingListComponent}
];  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
