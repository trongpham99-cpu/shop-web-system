import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private messageService: MessageService,
  ) {
  }

  ngOnInit(): void {
  }

  title = 'shop-web-client';

  public visible = false;
  public tabActive = 'active';
  public userLogin = {
    email: '',
    password: ''
  };
  sidebarVisible: boolean = false;

  public userRegister = {
    email: '',
    password: '',
    fullName: '',
  };
  public user = localStorage.getItem('user_login') ? JSON.parse(localStorage.getItem('user_login') || '') : null;

  showDialog() {
    this.visible = true;
  }


  login() {
    this.authService.login(this.userLogin).subscribe((res: any) => {
      const { metadata } = res;
      const user = {
        email: metadata.shop.email,
        id: metadata.shop._id,
        accessToken: metadata.tokens.accessToken,
      };

      localStorage.setItem('user_login', JSON.stringify(user));
      this.visible = false;
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login success' });

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }, (err: any) => {
      const { error } = err;
      const { message } = error;
      this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
    });
  }

  logout() {
    localStorage.removeItem('user_login');
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Logout success' });

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
}
