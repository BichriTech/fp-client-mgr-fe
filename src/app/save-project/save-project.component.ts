import { Component } from '@angular/core';
import { ProjectService } from '../project.service';
import { ToastrService } from 'ngx-toastr';
import { Project } from '../project';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../client';
import { ClientService } from '../client.service';
import moment from 'moment';

//import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-save-project',
  standalone: false,
  templateUrl: './save-project.component.html',
  styleUrl: './save-project.component.css'
})
export class SaveProjectComponent {

  
  
  projObject: Project = new Project();
  cliObj: Client = new Client();
  clientId: number = 0;

  options =[
    {value: 'NotStart' , text: 'NotStart'},
    {value: 'Started' , text: 'Started'},
    {value: 'OnGoing' , text: 'OnGoing'},
    {value: 'Pending' , text: 'Pending'},
    {value: 'Completed' , text: 'Completed'}

  ];

  selectedValue = this.options[0].value;
  
  constructor(private projServ:ProjectService, private cliServ:ClientService,
     private toaster:ToastrService, private aRoute:ActivatedRoute,
      private router:Router) {

    this.clientId = this.aRoute.snapshot.params['id'];
    this.cliServ.getClientById(this.clientId).subscribe(data => {
      this.cliObj = data;
    })
    
  }

  savingProject():void {

   
    const formatedStartDate = moment(this.projObject.startDate).format('YYYY-MM-DD');
    const formatedEndDate = moment(this.projObject.endDate).format('YYYY-MM-DD');  // (this.projObject.endDate as Date).toISOString().split('T')[0];

    const projectToSave = {
      name: this.projObject.name,
      duration: this.projObject.duration,
      startDate: formatedStartDate,
      endDate: formatedEndDate,
      projectStatus: this.projObject.projectStatus,
      clientId: this.clientId
    };

    console.log(projectToSave);
    this.projServ.saveProject(projectToSave).subscribe(response => {
      this.toaster.success("Project saved successfully ");
      this.router.navigate(["/projects-list"]);
      
    })

  }

  ngbDateToString(date:any)
{
    return date.year+'-'+('0'+date.month).slice(-2)+('0'+date.day).slice(-2);
}

}
