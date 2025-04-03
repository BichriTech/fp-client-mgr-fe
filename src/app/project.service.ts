import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from './project';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http:HttpClient) { }

  private BASE_URL ='http://localhost:1825/client-mgr/api/projects';


  public saveProject(project:any):Observable<Object> {
    
    return this.http.post(`${this.BASE_URL}` + '/save', project);
  }

  public updateProject(projectId:number, project: any):Observable<Object>{

    return this.http.put(`${this.BASE_URL}` + '/update/' + `${projectId}`, project);
  }

  public getAllProjects():Observable<Project[]> {
    
    return this.http.get<Project[]>(`${this.BASE_URL}`);
  }

  public deleteProject(projectId: number):Observable<Object> {

    return this.http.delete(`${this.BASE_URL}/${projectId}`, {responseType: 'text'});
  }

  public getProjectById(projectId: number):Observable<Project> {

    return this.http.get<Project>(`${this.BASE_URL}/${projectId}`);
  }
}
