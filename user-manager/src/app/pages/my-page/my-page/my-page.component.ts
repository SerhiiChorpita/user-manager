import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-page',
  templateUrl: './my-page.component.html',
  styleUrls: ['./my-page.component.scss']
})
export class MyPageComponent implements OnInit {
  public message!: String;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }


  // Execute this HTTP request when the route loads
  ngOnInit() {
    this.http.get<any>('http://localhost:3000/users/my-page').subscribe(
      (response) => {
        if (response) {
          this.message = response.msg;
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
