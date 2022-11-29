import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  loginChanged: EventEmitter<any> = new EventEmitter();

  public isLogined!: string;

  constructor(
  ) { }

  get Login(): string {
    return this.isLogined;
  }

  set Login(val: string) {
    this.isLogined = val;
    this.loginChanged.emit(val);
  }
}
