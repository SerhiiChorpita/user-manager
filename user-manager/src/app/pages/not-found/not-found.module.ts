import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NotFoundComponent } from './not-found/not-found.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [NotFoundComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: NotFoundComponent }
    ]),
    FormsModule
  ]
})
export class NotFoundModule { }
