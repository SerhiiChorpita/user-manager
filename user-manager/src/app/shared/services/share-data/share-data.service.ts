import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  loginChanged: EventEmitter<any> = new EventEmitter();

  public isLogined!: boolean;

  constructor(
  ) { }

  get Login(): boolean {
    return this.isLogined;
  }

  set Login(val: boolean) {
    this.isLogined = val;
    this.loginChanged.emit(val);
  }
}
