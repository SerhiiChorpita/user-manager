import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUsersEdit, IUsersRequest, IUsersResponce } from '../../interfaces/users.interface';

@Injectable({
  providedIn: 'root'
})
export class DataBaseService {
  private usersUrl = 'http://localhost:3000/mon/users';

  constructor(
    private http: HttpClient,
  ) { }

  getUsers(): Observable<IUsersResponce[]> {
    return this.http.get<IUsersResponce[]>(this.usersUrl)
  }

  getUserDetails(id: number | string): Observable<any> {
    return this.http.get(`${this.usersUrl}/${id}`);
  }

  addUser(user: IUsersRequest): Observable<IUsersRequest> {
    return this.http.post<IUsersRequest>(this.usersUrl, user)
  }

  updateUser(id: number, data: IUsersEdit): Observable<IUsersEdit> {
    return this.http.put<IUsersEdit>(`${this.usersUrl}/${id}`, data);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.usersUrl}/${id}`);
  }

}
