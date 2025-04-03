import { Component } from '@angular/core';
import { Client } from '../client';
import { ClientService } from '../client.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-save-client',
  standalone: false,
  templateUrl: './save-client.component.html',
  styleUrl: './save-client.component.css'
})
export class SaveClientComponent {

  clientObj: Client = new Client();

  
  constructor(private cliServ:ClientService, private toaster : ToastrService) {}

  savingClient():void{

    this.cliServ.saveClient(this.clientObj).subscribe(response => {

      this.toaster.success('Client saved successfully ', 'Saving Client');
      console.log(response);
      this.resetForm();
    })

  }

  resetForm():void{

    this.clientObj.company = "";
    this.clientObj.email = "";
    this.clientObj.location = "";
    this.clientObj.name = "";
    this.clientObj.password = "";
    this.clientObj.phone = "";
  }

}
