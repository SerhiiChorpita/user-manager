import { Component, OnInit } from '@angular/core';
import { ShareDataService } from 'src/app/shared/services/share-data/share-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isLogined!: string;

  constructor(private shareData: ShareDataService
  ) {
    shareData.loginChanged.subscribe(clientDate => this.clientLoginStatus(clientDate));
  }
  ngOnInit(): void {
  }

  clientLoginStatus(clientLogin: string): void {
    this.isLogined = clientLogin;
  }

}
