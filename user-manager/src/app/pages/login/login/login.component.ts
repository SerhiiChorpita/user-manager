import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { NotitionService } from 'src/app/shared/services/notition/notition.service';
import { ShareDataService } from 'src/app/shared/services/share-data/share-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('loginform', { static: false }) loginForm!: NgForm;

  public message: string = '';
  public isLogined!: string;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private shareData: ShareDataService,
    private notify: NotitionService,

  ) {
    shareData.loginChanged.subscribe(clientDate => this.clientLoginStatus(clientDate));
  }

  ngOnInit() {
  }

  clientLoginStatus(clientLogin: string): void {
    this.isLogined = clientLogin;
  }

  checkLoginStatus(isLogined: string): void {
    this.shareData.Login = isLogined;
  }

  onLoginSubmit() {
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;

    const headers = new HttpHeaders({ 'Content-type': 'application/json' });

    const reqObject = {
      username: username,
      password: password
    };

    this.http.post('http://localhost:3000/users/login', reqObject, { headers: headers }).subscribe(

      (response) => {
        this.authService.setLocalStorage(response);

        let user = localStorage.getItem('user');

        if (user === 'admin@gmail.com') {
          this.checkLoginStatus('ADMIN');
        } else if (user === 'customer@gmail.com') {
          this.checkLoginStatus('Customer');
        }
      },

      (error) => {
        if (error) {
          this.notify.error(error.error.msg);
        }
      },

      () => {
        this.router.navigate(['dashboard']);
        this.notify.login(this.isLogined);
      }
    );
  }


}