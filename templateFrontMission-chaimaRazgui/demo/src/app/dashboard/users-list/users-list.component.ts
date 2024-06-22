import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/Models/user.model';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
})
export class UsersListComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(
      (data:User[]) => {
        this.users = data;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }
}
