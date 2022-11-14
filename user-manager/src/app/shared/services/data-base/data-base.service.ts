import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUsersRequest, IUsersResponce } from '../../interfaces/users.interface';

@Injectable({
  providedIn: 'root'
})
export class DataBaseService {

  private usersUrl = 'http://localhost:3002/users';

  constructor(
    private http: HttpClient,
  ) { }

  getUsers(): Observable<IUsersResponce[]> {
    return this.http.get<IUsersResponce[]>(this.usersUrl)
  }
  addUser(user: IUsersRequest): Observable<IUsersRequest> {
    return this.http.post<IUsersRequest>(this.usersUrl, user)
  }

}
