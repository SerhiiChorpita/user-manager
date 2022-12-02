import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { IUsersDetails } from '../../interfaces/users.interface';
import { DataBaseService } from '../data-base/data-base.service';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsResolver implements Resolve<IUsersDetails> {

  constructor(
    private dataBase: DataBaseService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUsersDetails> {

    return this.dataBase.getUserDetails(String(route.paramMap.get('id')));
  }
}
