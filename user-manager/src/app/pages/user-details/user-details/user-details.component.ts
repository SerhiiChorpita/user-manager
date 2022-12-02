import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';

import { IUsersDetails, IUsersEdit, IUsersResponce } from 'src/app/shared/interfaces/users.interface';
import { DataBaseService } from 'src/app/shared/services/data-base/data-base.service';
import { EditGuard } from 'src/app/shared/services/guards/edit/edit.guard';
import { NotitionService } from 'src/app/shared/services/notition/notition.service';
import { ShareDataService } from 'src/app/shared/services/share-data/share-data.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
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
  public formRights!: Array<string>;

  constructor(
    private database: DataBaseService,
    private notify: NotitionService,
    private editData: EditGuard,
    private shareData: ShareDataService
  ) {
    shareData.loginChanged.subscribe(clientDate => this.clientLoginStatus(clientDate));
    editData.myPageChanged.subscribe(myStatus => this.setEditStatus(myStatus));
  }

  ngOnInit() {
    this.getMyDetails();
  }
  setEditStatus(myStatus: boolean): boolean {
    return this.editStatus = myStatus;
  }
  reSetEditStatus(myStatus: boolean): void {
    this.editData.myPage = myStatus;
  }

  updateUserData(form: NgForm): void {
    let myMoment = moment().format('LLL');

    let updatedUser = {
      userName: this.formName,
      phoneNumber: this.formPhoneNumber,
      email: this.formEmail,
      rights: this.formRights,
      updatedAt: myMoment
    }

    this.database.updateUser(this.myUser._id, updatedUser).subscribe(() => {
      this.notify.notise(`${updatedUser.userName} was updated successfully`)
    },
      error => this.notify.error(error)
    );
    this.editStatus = false;
    this.reSetEditStatus(this.editStatus);
    this.getMyDetails();
  }

  formAddData(): void {
    this.formName = this.myUser.userName;
    this.formPhoneNumber = this.myUser.phoneNumber;
    this.formEmail = this.myUser.email;
    this.formRights = this.myUser.rights;
  }

  getMyDetails(): void {
    this.database.getUsers().subscribe(
      (data) => {
        this.getUser(data);
      },
      error => this.notify.error(error)
    )
  }

  clientLoginStatus(clientLogin: string): void {
    this.isLogined = clientLogin;
  }

  getUser(data: IUsersResponce[]): void {
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
  }

}
