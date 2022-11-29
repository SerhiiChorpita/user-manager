import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUsersRequest, IUsersResponce } from '../../interfaces/users.interface';

@Injectable({
  providedIn: 'root'
})
export class DataBaseService {
  private usersUrl = 'http://localhost:3000/api/users';

  constructor(
    private http: HttpClient,
  ) { }

  getUsers(): Observable<IUsersResponce[]> {
    return this.http.get<IUsersResponce[]>(this.usersUrl)
  }
  addUser(user: IUsersRequest): Observable<IUsersRequest> {
    return this.http.post<IUsersRequest>(this.usersUrl, user)
  }
  updateUser(id: number, data: IUsersResponce): Observable<any> {
    return this.http.put(`${this.usersUrl}/${id}`, data);
  }
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.usersUrl}/${id}`);
  }

}
