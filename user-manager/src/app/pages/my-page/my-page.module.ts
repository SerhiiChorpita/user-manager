import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MyPageComponent } from './my-page/my-page.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [MyPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: MyPageComponent }
    ]),
    FormsModule
  ]
})
export class MyPageModule { }
