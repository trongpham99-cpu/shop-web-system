import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  logout() {
    localStorage.removeItem('user_login');
    window.location.href = '/login';
  }
}
