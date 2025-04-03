import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Meeting } from './meeting';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  constructor(private http:HttpClient) { }

  private BASE_URL ='http://localhost:1825/client-mgr/api/meetings';

  public scheduleMeeting(meeting: any):Observable<Object> {
   
    return this.http.post(`${this.BASE_URL}` + '/save', meeting);
  }

  public updateMeeting(meetId:number, meeting: any):Observable<Object> {
    
    return this.http.put(`${this.BASE_URL}` + '/update/' + `${meetId}`, meeting);
  }

  public getAllMeetings():Observable<Meeting[]> {
    
    return this.http.get<Meeting[]>(`${this.BASE_URL}`);
  }

  public deleteMeeting(meetId: number):Observable<Object> {

    return this.http.delete(`${this.BASE_URL}/${meetId}`, {responseType: 'text'});
  }

  public getMeetingById(meetId: number):Observable<Meeting> {
  
      return this.http.get<Meeting>(`${this.BASE_URL}/${meetId}`);
    }
}
