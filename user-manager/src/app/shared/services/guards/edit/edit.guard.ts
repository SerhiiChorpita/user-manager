import { EventEmitter, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { MyPageModule } from '../../../../pages/my-page/my-page.module';

@Injectable({
  providedIn: 'root'
})
export class EditGuard implements CanDeactivate<MyPageModule> {

  myPageChanged: EventEmitter<any> = new EventEmitter();

  public myPage: boolean = false;

  constructor(
  ) { }

  get myPageEditStatus(): boolean {
    return this.myPage;
  }

  set myPageEditStatus(val: boolean) {
    this.myPage = val;
    this.myPageChanged.emit(val);
  }

  canDeactivate(component: MyPageModule, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot | undefined): boolean {
    if (this.myPage) {
      let confirmation = confirm('All unsaved data will be lost. Still want to leave the page?');
      if (confirmation) {
        return true;
      }
      return false;
    }
    return true
  }

}
