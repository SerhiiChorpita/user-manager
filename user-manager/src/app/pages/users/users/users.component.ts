import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
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
  public baseCheking: boolean = false;
  public addNewUser: boolean = false;

  public isLogined!: string;
  public users!: IUsersResponce;
  private allUsersPrivate: Array<IUsersResponce> = [];
  public allUsers: Array<IUsersDetails> = [];
  public myUser!: IUsersDetails;
  public userId!: number;

  public editStatus: boolean = false;
  public formName!: string;
  public formPhone!: number;
  public formEmail!: string;
  public formPass!: string;
  public formPass2!: string;
  public currentId!: number;

  public canViewUsers: boolean = false;
  public canViewDetails: boolean = false;
  public canEditUsers: boolean = false;
  public canDeleteUsers: boolean = false;

  constructor(
    private database: DataBaseService,
    private notify: NotitionService,
    private router: Router,
    private http: HttpClient,
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
    this.getMyDetails();
  }

  baseCheck(): void {

    this.checkUserRights('can_view_users');
    this.checkUserRights('can_view_details');
    this.checkUserRights('can_edit_users');
    this.checkUserRights('can_delete_users');
    this.checkUserRights('can_view_details_full');
    this.checkUserRights('can_edit_users_full');
    this.baseCheking = true;
  }

  checkUserRights(right: string): boolean {

    if (this.myUser.rights.includes(right)) {
      switch (right) {
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
    return false
  }

  getUsersList(): void {
    this.allUsers = [];

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


  toUserDetails(id: number): void {
    this.router.navigate(['/users', id]);
  }


  addUserToList(from: NgForm): void {
    let myMoment = moment().format('LLL');
    const headers = new HttpHeaders({ 'Content-type': 'application/json' });

    let newUser = {
      userName: this.formName,
      phoneNumber: this.formPhone,
      email: this.formEmail,
      password: this.formPass,
      rights: [],
      createdAt: myMoment,
      updatedAt: myMoment
    }


    this.http.post('http://localhost:3000/users/register', newUser, { headers: headers }).subscribe(() => { },
      (error) => { this.notify.error(error) },
    );

    this.database.addUser(newUser).subscribe(() => {
    },
      error => console.log(error)
    );

    this.notify.notise(`user: ${this.formName} was added successfully`)
    setTimeout(() => {
      this.getUsersList();
    }, 500);
    from.reset();
  }

  deleteUser(id: number, userName: string): void {
    this.database.deleteUser(id).subscribe(() => {
    },
      error => console.log(error)
    );

    this.notify.notise(`user: ${userName} was deleted successfully`);

    setTimeout(() => {
      this.getUsersList();
    }, 500);
  }

  getMyDetails(): void {
    this.database.getUsers().subscribe(
      (data) => {
        this.getUser(data);
      },
      error => this.notify.error(error)
    )
  }

  getUser(data: IUsersResponce[]): void {
    let userEmail = localStorage.getItem('user');

    data.find(item => {
      if (item.email === userEmail) {
        this.userId = item._id;
        this.database.getUserDetails(this.userId).subscribe(
          (data) => {
            this.myUser = data;
            this.baseCheck();
          },
          error => this.notify.error(error)
        )
      }
    })
  }

  changeAddNewUser(): void {
    this.addNewUser = !this.addNewUser;
  }

  sort(): void {
    this.allUsers.sort((a, b) => (a.userName > b.userName) ? 1 : ((b.userName > a.userName) ? -1 : 0))
  }

}
