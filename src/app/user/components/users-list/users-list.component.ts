import { Component, inject } from '@angular/core';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {
  
  public displayedColumns = ['id', 'name', 'email', 'gender'];

  public fullColumns = ['id', 'name', 'email', 'gender', 'action'];

  public userService = inject(UserService);

  public router = inject(Router);

  public users = this.userService.users;

  public totalUsersCount = this.userService.totalUsersCount;

  public setSelectedUserId(id: number): void {
    this.userService.setSelectedUserId(id);

    this.router.navigateByUrl(`tasks/${id}`);
  }
}
