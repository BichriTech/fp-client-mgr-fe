import { Component } from '@angular/core';
import { Project } from '../project';
import { ProjectService } from '../project.service';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-project',
  standalone: false,
  templateUrl: './edit-project.component.html',
  styleUrl: './edit-project.component.css'
})
export class EditProjectComponent {

  projObject: Project = new Project();

  projectId: number = 0;

  options = [
    { value: 'NotStart', text: 'NotStart' },
    { value: 'Started', text: 'Started' },
    { value: 'OnGoing', text: 'OnGoing' },
    { value: 'Pending', text: 'Pending' },
    { value: 'Completed', text: 'Completed' }

  ];

  selectedValue = this.options[0].value;

  constructor(private projServ: ProjectService, private toaster:ToastrService, 
    private aRoute: ActivatedRoute, private router: Router) {

    this.projectId = this.aRoute.snapshot.params['id'];
    this.projServ.getProjectById(this.projectId).subscribe(data => {
      this.projObject = data;
    })

  }

  editingProject(): void {

    const formatedStartDate = moment(this.projObject.startDate).format('YYYY-MM-DD');
    const formatedEndDate = moment(this.projObject.endDate).format('YYYY-MM-DD');

    const projectToUpdate = {
      name: this.projObject.name,
      duration: this.projObject.duration,
      startDate: formatedStartDate,
      endDate: formatedEndDate,
      projectStatus: this.projObject.projectStatus
    };

    console.log(this.projObject);

    this.projServ.updateProject(this.projectId, projectToUpdate).subscribe(data => {

      this.toaster.info("Project informations updated successfully ");
      this.router.navigate(['/projects-list']);
    })
  }

}
