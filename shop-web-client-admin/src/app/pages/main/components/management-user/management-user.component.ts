import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-management-user',
  templateUrl: './management-user.component.html',
  styleUrls: ['./management-user.component.scss']
})
export class ManagementUserComponent implements OnInit {

  constructor(
    private authService: AuthService,
  ) { }

  public users: any = [];
  selectedUser: any = null;
  userDialogVisible = false;

  ngOnInit(): void {
    this.getAllUser();
  }

  getAllUser = () => {
    this.authService.getllUser().subscribe((res: any) => {
      const { metadata } = res;
      console.log(metadata);
      this.users = metadata;
    })
  }

  editUser = (id: any, user: any) => {
    this.userDialogVisible = true;
    this.selectedUser = user;
  }

  roles = [
    'admin',
    'user'
  ]

  statuses = [
    'active',
    'inactive'
  ]

  deleteUser = (id: number) => {
    this.authService.deleteUser(id).subscribe((res: any) => {
      console.log(res);
      this.getAllUser();
    })
  }

  renderRole = (role: any) => {
    return role.join(', ');
  }


  resetSelectedUser = () => {
    this.selectedUser = null;
  }

  updateUser = () => {
    const { id, ...user } = this.selectedUser;
    this.authService.updateUser(id, user).subscribe((res: any) => {
      console.log(res);
      this.getAllUser();
    })
  }
}
