import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void { }

  public userLogin = {
    email: '',
    password: ''
  };

  login = () => {
    this.authService.login(this.userLogin).subscribe(
      (res: any) => {
        const { metadata } = res;
        const { shop, tokens } = metadata;
        if (shop.roles.includes('admin')) {
          const userLogin = {
            ...shop,
            ...tokens
          }

          localStorage.setItem('user_login', JSON.stringify(userLogin));
          window.location.href = '/';
        }
      },
      (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.error.message
        });
      }
    );
  }

}
