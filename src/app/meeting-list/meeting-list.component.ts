import { Component } from '@angular/core';
import { Meeting } from '../meeting';
import { MeetingService } from '../meeting.service';
import { ActivatedRoute, Router } from '@angular/router';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-meeting-list',
  standalone: false,
  templateUrl: './meeting-list.component.html',
  styleUrl: './meeting-list.component.css'
})
export class MeetingListComponent {

  meetList: Meeting[] = [];
  meetObj: Meeting = new Meeting();
  meetingId: number = 0;

  trashIcon = faTrashAlt;
    editIcon = faEdit;

  /**
   *
   */
  constructor(private meetServ:MeetingService, private router: Router, private aRoute: ActivatedRoute) {

    this.viewAllMeeting();
    this.meetingId = this.aRoute.snapshot.params['id'];
  }

  viewAllMeeting():void {

    this.meetServ.getAllMeetings().subscribe(data => {

      this.meetList = data;
    })

  }

  getOneMeeting(id: number): void{
    
    this.router.navigate(['/meeting/edit', id]);
  }

  deletingMeeting(id:number){

    Swal.fire({
          title: "Do you really want to delete this meeting ?",
          text: "Note if you process, no recovery possible",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then((result) => {
          if (result.isConfirmed) {
    
            this.meetServ.deleteMeeting(id).subscribe(data => {
              this.viewAllMeeting();
             
            })
    
            Swal.fire({
              title: "Deleted!",
              text: "The meeting has been deleted.",
              icon: "success"
            })
           //
          }
        }).catch(error =>{
          console.error(error);
        });
  }

}
