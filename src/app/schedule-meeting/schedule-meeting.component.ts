import { Component } from '@angular/core';
import { Client } from '../client';
import { Meeting } from '../meeting';
import { MeetingService } from '../meeting.service';
import { ClientService } from '../client.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment';

@Component({
  selector: 'app-schedule-meeting',
  standalone: false,
  templateUrl: './schedule-meeting.component.html',
  styleUrl: './schedule-meeting.component.css'
})
export class ScheduleMeetingComponent {

  cliObj: Client = new Client();
  meetObj: Meeting = new Meeting();
  clientId: number = 0;

 
  constructor(private meetServ:MeetingService, private cliServ:ClientService,
    private toaster:ToastrService, private aRoute:ActivatedRoute,
     private router:Router) {

      this.clientId = this.aRoute.snapshot.params['id'];
    this.cliServ.getClientById(this.clientId).subscribe(data => {
      this.cliObj = data;
    })
    
  }

  savingMeeting(): void {

    const formatedMeetDate = moment(this.meetObj.meetDate).format('YYYY-MM-DD');

    const meetToSave = {

      agenda: this.meetObj.agenda,
      meetDate: formatedMeetDate,
      meetTime: this.meetObj.meetTime,
      clientId: this.clientId
    };

    console.log(meetToSave);

    this.meetServ.scheduleMeeting(meetToSave).subscribe(response => {

      this.toaster.success("Meeting scheduled successfully");
      this.router.navigate(["/meetings-list"]);

    })

  }

}
