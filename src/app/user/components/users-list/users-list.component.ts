import { Component, inject } from '@angular/core';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {
  
  public displayedColumns = ['id', 'name', 'email', 'gender'];

  public fullColumns = ['id', 'name', 'email', 'gender', 'action'];

  public userService = inject(UserService);

  public users = this.userService.users;
}
