import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';
import { IUsersDetails, IUsersRequest, IUsersResponce } from 'src/app/shared/interfaces/users.interface';
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
  private allUsersPrivate: Array<IUsersResponce> = [];
  public allUsers: Array<IUsersDetails> = [];

  public editStatus: boolean = false;
  public formName!: string;
  public formPhone!: number;
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
    } else {
      this.clientLoginStatus('User');
    }

    this.getUsersList();
  }

  getUsersList(): void {

    this.database.getUsers().subscribe(
      (data) => {
        this.allUsersPrivate = data;

        data.forEach((element, index) => {
          let newUser: IUsersDetails = {
            _id: this.allUsersPrivate[index]._id,
            userName: this.allUsersPrivate[index].userName,
            email: this.allUsersPrivate[index].email,
            phoneNumber: this.allUsersPrivate[index].phoneNumber,
            rights: [],
            createdAt: this.allUsersPrivate[index].createdAt,
            updatedAt: this.allUsersPrivate[index].updatedAt
          }

          this.allUsers.push(newUser);
          this.sort();


        });

      },
      error => this.notify.error(error)
    )
  }


  // TODO:
  addUserToList(from: NgForm): void {
    let newForm = from.value;

    let myMoment = moment().format('LLL');

    let newUser: IUsersRequest = {
      userName: newForm.name,
      phoneNumber: newForm.phone,
      email: newForm.email,
      rights: [],
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


  // TODO:
  editUser(id: number, data: IUsersResponce): void {
    this.editStatus = true;
    this.currentId = id;
    this.formName = data.userName;
    this.formPhone = data.phoneNumber;
    this.formEmail = data.email;
    this.formPass = data.password;
  }


  // TODO:
  updateUser(from: NgForm): void {
    let myMoment = moment().format('LLL');
    let userId = this.allUsers[this.currentId]._id;
    let userCreatedAt = this.allUsers[this.currentId].createdAt;

    let updateUser: IUsersResponce = {
      _id: userId,
      createdAt: userCreatedAt,
      userName: this.formName,
      phoneNumber: this.formPhone,
      email: this.formEmail,
      rights: [],
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

  // TODO:
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
    this.allUsers.sort((a, b) => (a.userName > b.userName) ? 1 : ((b.userName > a.userName) ? -1 : 0))
  }

}
