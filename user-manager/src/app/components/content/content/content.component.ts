import { Component, OnInit } from '@angular/core';
import { NotitionService } from 'src/app/shared/services/notition/notition.service';
import { ShareDataService } from 'src/app/shared/services/share-data/share-data.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  public btn1: boolean = false;
  public btn2: boolean = true;
  public btn3: boolean = false;

  public isLogined!: boolean;

  constructor(
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

  checkLoginStatus(isLogined: boolean): void {
    this.shareData.Login = isLogined;
    this.notify.logout();
  }

  resetBtnValue(): void {
    this.btn1 = false;
    this.btn2 = false;
    this.btn3 = false;
  }

}
