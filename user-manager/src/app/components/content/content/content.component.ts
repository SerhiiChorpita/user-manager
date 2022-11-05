import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  public btn1: boolean = false;
  public btn2: boolean = true;
  public btn3: boolean = false;

  public isLogined: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  login(email: string, password: string): void {
    if (email === 'test@test.com' && password === 'test_test') {
      this.isLogined = true;
    } else {
      alert('email, або пароль введений невірно!')
    }
  }

  resetBtnValue(): void {
    this.btn1 = false;
    this.btn2 = false;
    this.btn3 = false;
  }

}
