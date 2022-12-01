import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public message: string = '';
  @ViewChild('registerform', { static: false }) registerForm!: NgForm;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,

  ) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const myMoment = moment().format('LLL');

    const userName = this.registerForm.value.userName;
    const phoneNumber = this.registerForm.value.phoneNumber;
    const email = this.registerForm.value.email;
    const password = this.registerForm.value.password;

    const headers = new HttpHeaders({ 'Content-type': 'application/json' });

    const reqObject = {
      userName: userName,
      phoneNumber: phoneNumber,
      email: email,
      password: password,
      createdAt: myMoment,
      updatedAt: myMoment
    };

    this.http.post('http://localhost:3000/users/register', reqObject, { headers: headers }).subscribe(

      (response) => {
        this.authService.setLocalStorage(response);
      },

      (error) => {
        if (error) {
          this.message = error.error.msg;
          setTimeout(() => {
            this.message = '';
          }, 2000);
        }
      },

      () => {
        this.router.navigate(['login']);
      }

    );
  }
}
