import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';
import { IUsersRequest, IUsersResponce } from 'src/app/shared/interfaces/users.interface';
import { DataBaseService } from 'src/app/shared/services/data-base/data-base.service';
import { NotitionService } from 'src/app/shared/services/notition/notition.service';
import { ShareDataService } from 'src/app/shared/services/share-data/share-data.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public isLogined!: string;
  public users!: IUsersResponce;
  public allUsers: Array<IUsersResponce> = [];

  public editStatus: boolean = false;
  public formName!: string;
  public formEmail!: string;
  public formPass!: string;
  public currentId!: number;

  constructor(
    private database: DataBaseService,
    private notify: NotitionService,
    private shareData: ShareDataService
  ) {
    shareData.loginChanged.subscribe(clientDate => this.clientLoginStatus(clientDate));
  }

  clientLoginStatus(clientLogin: string): void {
    this.isLogined = clientLogin;
  }


  ngOnInit(): void {
    let user = localStorage.getItem('user');

    if (user === 'admin@gmail.com') {
      this.clientLoginStatus('ADMIN');
    } else if (user === 'customer@gmail.com') {
      this.clientLoginStatus('Customer');
    }

    this.getUsersList();
  }

  getUsersList(): void {
    this.database.getUsers().subscribe(
      (data) => {
        this.allUsers = data;
        this.sort();
      },
      error => this.notify.error(error)
    )
  }

  addUserToList(from: NgForm): void {
    let newForm = from.value;

    let myMoment = moment().format('LLL');

    let newUser: IUsersRequest = {
      name: newForm.name,
      email: newForm.email,
      password: newForm.password,
      createdAt: myMoment,
      updatedAt: myMoment
    }

    this.database.addUser(newUser).subscribe(() => {
    },
      error => console.log(error)
    );

    this.notify.notise(`user: ${newForm.name} was added successfully`)
    setTimeout(() => {
      this.getUsersList();
    }, 500);
    from.reset();
  }

  editUser(id: number, data: IUsersResponce): void {
    this.editStatus = true;
    this.currentId = id;
    this.formName = data.name;
    this.formEmail = data.email;
    this.formPass = data.password;
  }

  updateUser(from: NgForm): void {
    let myMoment = moment().format('LLL');
    let userId = this.allUsers[this.currentId].id;
    let userCreatedAt = this.allUsers[this.currentId].createdAt;

    let updateUser: IUsersResponce = {
      id: userId,
      createdAt: userCreatedAt,
      name: this.formName,
      email: this.formEmail,
      password: this.formPass,
      updatedAt: myMoment
    }

    this.database.updateUser(userId, updateUser).subscribe(() => {
    },
      error => console.log(error)
    );

    setTimeout(() => {
      this.getUsersList();
    }, 500);
    this.editStatus = false;
    from.reset();
  }


  deleteUser(idUser: number, userName: string): void {
    this.database.deleteUser(idUser).subscribe(() => {
    },
      error => console.log(error)
    );

    this.notify.notise(`user: ${userName} was deleted successfully`);

    setTimeout(() => {
      this.getUsersList();
    }, 500);
  }

  sort(): void {
    this.allUsers.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
  }

}
