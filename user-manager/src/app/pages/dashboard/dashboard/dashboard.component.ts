import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShareDataService } from 'src/app/shared/services/share-data/share-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public isLogined!: string;
  public message!: String;

  constructor(
    private http: HttpClient,
    private router: Router,
    private shareData: ShareDataService,
  ) {
    shareData.loginChanged.subscribe(clientDate => this.clientLoginStatus(clientDate));
  }

  clientLoginStatus(clientLogin: string): void {
    this.isLogined = clientLogin;
  }

  // Execute this HTTP request when the route loads
  ngOnInit() {
    let user = localStorage.getItem('user');

    this.http.get<any>('http://localhost:3000/users/dashboard').subscribe(
      (response) => {
        if (response) {
          this.message = response.msg;
          if (user === 'admin@gmail.com') {
            this.clientLoginStatus('ADMIN');
          } else if (user === 'customer@gmail.com') {
            this.clientLoginStatus('Customer');
          }
        }
      },

      (error) => {
        if (error.status === 401) {
          this.message = 'You are not authorized to visit this route.  No data is displayed.';
        }
        this.router.navigate(['login']);
      }
    );
  }

}
