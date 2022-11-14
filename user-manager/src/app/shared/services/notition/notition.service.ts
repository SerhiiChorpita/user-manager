import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotitionService {

  constructor(
    private toastr: ToastrService
  ) { }
  notise(notise: string): void {
    this.toastr.success(notise);
  }
  logout(): void {
    this.toastr.success('You are logged out');
  }
  login(user: string): void {
    this.toastr.success(`You are logged in. Welcome ${user}`);
  }
  error(error: string): void {
    this.toastr.error('Error:', error);
  }
}
