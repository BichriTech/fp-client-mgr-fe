import { Component } from '@angular/core';
import { Client } from '../client';
import { ClientService } from '../client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-client',
  standalone: false,
  templateUrl: './edit-client.component.html',
  styleUrl: './edit-client.component.css'
})
export class EditClientComponent {

  cliId: number = 0;

  clientObj: Client = new Client();

  constructor(private cliServ: ClientService, private aRoute: ActivatedRoute,
     private router: Router, private toaster:ToastrService) {

    this.cliId = this.aRoute.snapshot.params['id'];
    this.cliServ.getClientById(this.cliId).subscribe(data => {
      this.clientObj = data;
    })
   
    
  }

  editClient():void{
    
    this.cliServ.updateClient(this.cliId, this.clientObj).subscribe(data => {

      this.toaster.info("Client informations updated successfully ");
      this.router.navigate(['/clients-list']);
    })
  }

}
