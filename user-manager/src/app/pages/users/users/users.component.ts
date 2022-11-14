import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IUsersEdit, IUsersRequest, IUsersResponce } from 'src/app/shared/interfaces/users.interface';
import { DataBaseService } from 'src/app/shared/services/data-base/data-base.service';
import { NotitionService } from 'src/app/shared/services/notition/notition.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public users!: IUsersResponce;
  public allUsers: Array<IUsersResponce> = [];

  constructor(
    private database: DataBaseService,
    private notify: NotitionService

  ) { }

  ngOnInit(): void {
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

    let date = new Date;
    let currentDay = date.getUTCDate();

    let newUser: IUsersRequest = {
      name: newForm.name,
      email: newForm.email,
      password: newForm.password,
      createdAt: currentDay,
      updatedAt: currentDay
    }

    this.database.addUser(newUser).subscribe(() => {
      this.notify.notise(`user: ${newForm.name} was added successfully`)
    },
      error => this.notify.notise(`user: ${newForm.name} was added successfully`)
      // error => this.notify.error(error.toString())
    )
    setTimeout(() => {
      this.getUsersList();

    }, 500);
    from.reset();
  }

  sort(): void {
    this.allUsers.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
  }

}
