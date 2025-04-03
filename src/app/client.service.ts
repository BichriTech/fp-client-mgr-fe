import { Injectable } from '@angular/core';
import { Client } from './client';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  private BASE_URL = 'http://localhost:1825/client-mgr/api/clients';

  public saveClient(cli:Client):Observable<Object> {

    return this.http.post(`${this.BASE_URL}` + '/save', cli);
  }

  public getAllClients():Observable<Client[]> {

    return this.http.get<Client[]>(`${this.BASE_URL}`);

  }

  public deleteClient(id: number):Observable<Object>{

    return this.http.delete(`${this.BASE_URL}/${id}`, { responseType: 'text'});
  }

  public updateClient(id: number, cli: Client):Observable<Object> {

    return this.http.put(`${this.BASE_URL}` + '/update/' + `${id}`, cli);
  }

  public getClientById(id: number):Observable<Client>{

    return this.http.get<Client>(`${this.BASE_URL}/${id}`);
  }

}
