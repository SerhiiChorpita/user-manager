import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { UserDetailsComponent } from './user-details/user-details.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [UserDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: UserDetailsComponent }
    ]),
    FormsModule
  ]
})
export class UserDetailsModule { }
