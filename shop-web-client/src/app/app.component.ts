import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  constructor(
    private authService: AuthService
  ) {
  }

  title = 'shop-web-client';
  public visible = false;
  public tabActive = 'active';
  public userLogin = {
    email: '',
    password: ''
  };

  public userRegister = {
    email: '',
    password: '',
    fullName: '',
  };

  showDialog() {
    this.visible = true;
  }

  login() {
    this.authService.login(this.userLogin).subscribe((res: any) => {
      console.log(res);
    }, (err: any) => {
      console.log(err);
    });
  }

}
