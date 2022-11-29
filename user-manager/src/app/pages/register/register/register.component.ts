import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
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
    const username = this.registerForm.value.username;
    const password = this.registerForm.value.password;

    const headers = new HttpHeaders({ 'Content-type': 'application/json' });

    const reqObject = {
      username: username,
      password: password
    };

    this.http.post('http://localhost:3000/users/register', reqObject, { headers: headers }).subscribe(

      (response) => {
        this.authService.setLocalStorage(response);
        console.log(response);
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
        console.log('done!');
        this.router.navigate(['login']);
      }

    );
  }
}
