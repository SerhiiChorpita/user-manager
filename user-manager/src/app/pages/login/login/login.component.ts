import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotitionService } from 'src/app/shared/services/notition/notition.service';
import { ShareDataService } from 'src/app/shared/services/share-data/share-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public isLogined!: boolean;

  constructor(
    public router: Router,
    private shareData: ShareDataService,
    private notify: NotitionService
  ) {
    shareData.loginChanged.subscribe(clientDate => this.clientLoginStatus(clientDate));
  }
  ngOnInit(): void {
  }

  clientLoginStatus(clientLogin: boolean): void {
    this.isLogined = clientLogin;
  }

  login(email: string, password: string): void {
    if (email === 'test@test.com' && password === 'test_test') {
      this.isLogined = true;
      this.router.navigate(['dashboard']);
      this.checkLoginStatus(this.isLogined);
      this.notify.login('user');
    } else {
      this.notify.error('email, або пароль введений невірно!')
    }
  }


  checkLoginStatus(isLogined: boolean): void {
    this.shareData.Login = isLogined;
  }

}
