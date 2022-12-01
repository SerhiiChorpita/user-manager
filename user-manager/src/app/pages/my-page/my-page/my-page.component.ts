import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';

import { IUsersDetails, IUsersEdit } from 'src/app/shared/interfaces/users.interface';
import { DataBaseService } from 'src/app/shared/services/data-base/data-base.service';
import { NotitionService } from 'src/app/shared/services/notition/notition.service';
import { ShareDataService } from 'src/app/shared/services/share-data/share-data.service';

@Component({
  selector: 'app-my-page',
  templateUrl: './my-page.component.html',
  styleUrls: ['./my-page.component.scss']
})
export class MyPageComponent implements OnInit {
  @ViewChild('updateuser', { static: false }) updateUser!: NgForm;

  public isDataAvailable: boolean = false;
  public message!: string;
  public isLogined!: string;
  public userId!: number;
  public myUser!: IUsersDetails;

  public editStatus: boolean = false;
  public formName!: string;
  public formPhoneNumber!: number;
  public formEmail!: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private database: DataBaseService,
    private notify: NotitionService,
    private shareData: ShareDataService
  ) {
    shareData.loginChanged.subscribe(clientDate => this.clientLoginStatus(clientDate));
  }

  ngOnInit() {
    this.checkLogin();
    this.getMyDetails();

  }

  updateUserData(form: NgForm): void {
    let myMoment = moment().format('LLL');

    let updatedUser = {
      userName: this.formName,
      phoneNumber: this.formPhoneNumber,
      email: this.formEmail,
      rights: ['can_edit_users_full'],
      updatedAt: myMoment
    }
    console.log(this.myUser._id);
    console.log(updatedUser);


    this.database.updateUser(this.myUser._id, updatedUser).subscribe(() => {
    },
      error => this.notify.error(error)
    );
    this.editStatus = false;
    this.getMyDetails();
  }

  formAddData(): void {
    this.formName = this.myUser.userName;
    this.formPhoneNumber = this.myUser.phoneNumber;
    this.formEmail = this.myUser.email;
  }

  getMyDetails(): void {
    this.database.getUsers().subscribe(
      (data) => {
        let userEmail = localStorage.getItem('user');

        data.find(item => {
          if (item.email === userEmail) {
            this.userId = item._id;
            this.database.getUserDetails(this.userId).subscribe(
              (data) => {
                this.myUser = data;

                this.isDataAvailable = true;

                this.formAddData();
              },
              error => this.notify.error(error)
            )
          }
        })
      },
      error => this.notify.error(error)
    )
  }

  checkLogin(): void {
    this.http.get<any>('http://localhost:3000/users/my-page').subscribe(
      (response) => {
        if (response) {
          this.message = response.msg;
        }
      },
      (error) => {
        if (error.status === 401) {
          this.notify.error('You are not authorized to visit this route.  No data is displayed.');
        }
        this.router.navigate(['login']);
      }
    );
  }

  clientLoginStatus(clientLogin: string): void {
    this.isLogined = clientLogin;
  }

  getUser(): void {

    // this.database.
  }

}
