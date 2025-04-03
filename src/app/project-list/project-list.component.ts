import { Component } from '@angular/core';
import { Project } from '../project';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { ProjectService } from '../project.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-project-list',
  standalone: false,
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css'
})
export class ProjectListComponent {

  trashIcon = faTrashAlt;
    editIcon = faEdit;

  projList: Project[]= [];
  projObj: Project = new Project();
  projId: number = 0;

  /**
   *
   */
  constructor(private projServ:ProjectService, private router:Router, private aRoute:ActivatedRoute) {

    this.viewAllProject();
    this.projId = this.aRoute.snapshot.params['id'];
    
  }

  viewAllProject():void {

    this.projServ.getAllProjects().subscribe(data => {
      this.projList = data;

    })

  }

  getOneProject(id: number):void {
    this.router.navigate(['/project/edit', id]);
  }

  deletingProject(id: number): void {

    Swal.fire({
          title: "Do you really want to delete this project ?",
          text: "Note if you delete a project you cannot process to a recovery",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then((result) => {
          if (result.isConfirmed) {
    
            this.projServ.deleteProject(id).subscribe(data => {
              this.viewAllProject();
             
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
