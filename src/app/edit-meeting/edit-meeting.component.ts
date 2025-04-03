import { Component } from '@angular/core';
import { Meeting } from '../meeting';
import { MeetingService } from '../meeting.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment';

@Component({
  selector: 'app-edit-meeting',
  standalone: false,
  templateUrl: './edit-meeting.component.html',
  styleUrl: './edit-meeting.component.css'
})
export class EditMeetingComponent {

  meetObj: Meeting = new Meeting();
  meetingId: number = 0;


  constructor(private meetServ:MeetingService, private toaster:ToastrService, 
    private aRoute: ActivatedRoute, private router: Router) {

      this.meetingId = this.aRoute.snapshot.params['id'];
    this.meetServ.getMeetingById(this.meetingId).subscribe(data => {
      this.meetObj = data;
    
  })
}

  updatingMeeting():void {

    const formatedMeetDate = moment(this.meetObj.meetDate).format('YYYY-MM-DD');
    
        const meetToUpdate = {
    
          agenda: this.meetObj.agenda,
          meetDate: formatedMeetDate,
          meetTime: this.meetObj.meetTime
        };
    
        console.log(meetToUpdate);
    
        this.meetServ.updateMeeting(this.meetingId, meetToUpdate).subscribe(response => {
    
          this.toaster.info("Meeting informations updated successfully");
          this.router.navigate(["/meetings-list"]);
    
        })

  }

}
