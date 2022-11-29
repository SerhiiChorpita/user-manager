import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { NotitionService } from 'src/app/shared/services/notition/notition.service';
import { ShareDataService } from 'src/app/shared/services/share-data/share-data.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  public btn1: boolean = false;
  public btn2: boolean = false;
  public btn3: boolean = false;

  public isLogined!: string;

  constructor(
    private shareData: ShareDataService,
    private notify: NotitionService,
    private authService: AuthService,
    private router: Router
  ) {
    shareData.loginChanged.subscribe(clientDate => this.clientLoginStatus(clientDate));
  }

  ngOnInit(): void {
    if (this.isLogined === '') {
      this.router.navigate(['login']);
    }

    if (this.isLogined === undefined) {
      let user = localStorage.getItem('user');
      if (user) {
        if (user === 'admin@gmail.com') {
          this.isLogined = 'ADMIN';
        } else if (user === 'customer@gmail.com') {
          this.isLogined = 'Customer';
        }
      }
    }
  }

  clientLoginStatus(clientLogin: string): void {
    this.isLogined = clientLogin;
  }

  checkLoginStatus(isLogined: string): void {
    this.shareData.Login = isLogined;
  }

  resetBtnValue(): void {
    this.btn1 = false;
    this.btn2 = false;
    this.btn3 = false;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['login']);
    this.notify.logout();
  }

}
