import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { UsersComponent } from './users/users.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: UsersComponent }
    ]),
    FormsModule
  ]
})
export class UsersModule { }
