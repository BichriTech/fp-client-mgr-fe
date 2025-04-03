import { Component, ElementRef, ViewChild } from '@angular/core';
import { ClientService } from '../client.service';
import { Client } from '../client';
import {faTrashAlt, faEdit, faProjectDiagram, faCalendar} from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2'
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'console';

@Component({
  selector: 'app-client-list',
  standalone: false,
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.css'
})
export class ClientListComponent {

  trashIcon = faTrashAlt;
  editIcon = faEdit;
  projectIcon = faProjectDiagram;
  meetingIcon = faCalendar

  cliList: Client[] = [];
  clientObj: Client = new Client();
  cliId: number = 0;

  @ViewChild('editModal') editingModal:ElementRef | undefined;

  constructor(private cliServ: ClientService, private router: Router, private aRoute: ActivatedRoute) {

    this.viewAllClient();
    this.cliId = this.aRoute.snapshot.params['id'];
    
    
  }

  viewAllClient():void{
    this.cliServ.getAllClients().subscribe(data => {
      this.cliList = data;

    })

  }


  editClient():void{
    this.cliServ.updateClient(this.cliId, this.clientObj).subscribe(data => {
      
      this.router.navigate(['/clients-list']);
    })
  }

  getOneClient(id: number): void {

    
    this.router.navigate(['/client/edit', id]);
    
  }

  setProjectToClient(id: number):void{

    this.router.navigate(['/client/project/save', id]);
  }

  setMeetingtToClient(id:number): void {
    this.router.navigate(['/client/meeting/schedule', id]);
  }

  closeViewOneClient(){
    if(this.editingModal){
      this.editingModal.nativeElement.style.display = "none";

    }
  }

  deletingClient(id: number): void {
    Swal.fire({
      title: "Do you really want to delete this client ?",
      text: "Note if you delete a client all current project and meeting will not no longer access",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {

        this.cliServ.deleteClient(id).subscribe(data => {
          this.viewAllClient();
         
        })

        Swal.fire({
          title: "Deleted!",
          text: "The client has been deleted.",
          icon: "success"
        })
       //
      }
    }).catch(error =>{
      console.error(error);
    });
  }

}
