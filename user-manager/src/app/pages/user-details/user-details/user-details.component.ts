import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

import { IRights, IUsersDetails, IUsersEdit, IUsersResponce } from 'src/app/shared/interfaces/users.interface';
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
  public myUserIn!: IUsersDetails;
  public canEditSelf!: boolean;

  public isDataAvailable: boolean = false;
  public message!: string;
  public localName!: string;
  public isLogined!: string;
  public userId!: number;
  public myUser!: IUsersDetails;

  public editStatus: boolean = false;
  public formName!: string;
  public formPhoneNumber!: number;
  public formEmail!: string;
  public formRights!: Array<string>;

  public canViewUsers!: boolean;
  public canViewDetails!: boolean;
  public canEditUsers!: boolean;
  public canDeleteUsers!: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private database: DataBaseService,
    private notify: NotitionService,
    private editData: EditGuard,
    private shareData: ShareDataService
  ) {
    shareData.loginChanged.subscribe(clientDate => this.clientLoginStatus(clientDate));
    editData.myPageChanged.subscribe(myStatus => this.setEditStatus(myStatus));
  }

  ngOnInit() {
    this.getUser();
    this.checkUser();
    this.myUser.rights.forEach(elem => {
      this.checkRightsFalse(elem);
      this.checkRightsTrue(elem);
    })
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
  }

  formAddData(): void {
    this.formName = this.myUser.userName;
    this.formPhoneNumber = this.myUser.phoneNumber;
    this.formEmail = this.myUser.email;
    this.formRights = this.myUser.rights;
  }

  clientLoginStatus(clientLogin: string): void {
    this.isLogined = clientLogin;
  }

  getUser(): void {
    this.activatedRoute.data.subscribe(response => {
      this.myUser = response['productInfo'];

      this.isDataAvailable = true;
      this.formAddData();
    },
      error => this.notify.error(error)
    )
  }

  checkUser(): void {
    this.localName = String(localStorage.getItem('user'));
    if (this.localName === 'admin@gmail.com') {
      this.isLogined = 'ADMIN';
    }
  }

  checkRightsTrue(addKey: string): boolean {
    switch (addKey) {
      case 'can_view_users':
      case 'can_view_details_full':
        return this.canViewUsers = true;
      case 'can_view_details':
      case 'can_view_details_full':
        return this.canViewDetails = true;
      case 'can_edit_users':
      case 'can_edit_users_full':
        return this.canEditUsers = true;
      case 'can_delete_users':
      case 'can_edit_users_full':
        return this.canDeleteUsers = true;
      default:
        break;
    }
    return true

  }
  checkRightsFalse(delKey: string): boolean {
    switch (delKey) {
      case 'can_view_users':
        return this.canViewUsers = false;
      case 'can_view_details':
        return this.canViewDetails = false;
      case 'can_edit_users':
        return this.canEditUsers = false;
      case 'can_delete_users':
        return this.canDeleteUsers = false;
      default:
    }
    return false
  }


  changeRights(right: string): void {

    if (!this.myUser.rights.includes(right)) {
      let rightsToUpdate: IRights = {
        rights: []
      }

      rightsToUpdate.rights = this.myUser.rights;

      rightsToUpdate.rights.push(right);

      this.database.updateUser(this.myUser._id, []).subscribe(() => {
      },
        error => this.notify.error(error)
      );

      this.database.updateUser(this.myUser._id, rightsToUpdate).subscribe(() => {
        this.checkRightsTrue(right)
      },
        error => this.notify.error(error)
      );

      rightsToUpdate.rights = [];
      console.log('true', this.myUser.rights);

    } else {

      let index = this.myUser.rights.indexOf(right);

      if (index !== -1) {
        this.myUser.rights.splice(index, 1);
        let rightsToUpdate2: IRights = {
          rights: this.myUser.rights
        }

        this.database.updateUser(this.myUser._id, []).subscribe(() => {
        },
          error => this.notify.error(error)
        );

        this.database.updateUser(this.myUser._id, rightsToUpdate2).subscribe(() => {
          this.checkRightsFalse(right)
        },
          error => this.notify.error(error)
        );

        rightsToUpdate2.rights = [];
        console.log('false', this.myUser.rights);
      }
    }
  }

  getMyDetails(): void {
    this.database.getUsers().subscribe(
      (data) => {
        this.getUserIn(data);
      },
      error => this.notify.error(error)
    )
  }

  getUserIn(data: IUsersResponce[]): void {
    let userEmail = localStorage.getItem('user');

    data.find(item => {
      if (item.email === userEmail) {
        this.userId = item._id;
        this.database.getUserDetails(this.userId).subscribe(
          (data) => {
            this.myUserIn = data;
            if (this.myUserIn.email, this.localName) {
              this.canEditSelf = true;
            }

          },
          error => this.notify.error(error)
        )
      }
    })
  }

}
