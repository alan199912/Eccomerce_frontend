import { UserService } from '../../../core/services/service/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user.models';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  public users: User[];
  public columns: string[] = [];
  public isLoading = false;

  constructor(private readonly userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  public getUsers(): void {
    this.isLoading = true;
    this.userService.getUsersList().subscribe({
      next: (res) => {
        if (!res) {
          this.isLoading = false;
          return;
        }

        this.users = res;
        this.users = this.users.map((user) => {
          return {
            ...user,
            createdAt: new Date(user.createdAt).toLocaleDateString(),
            updatedAt: new Date(user.updatedAt).toLocaleDateString(),
            deletedAt: user.deletedAt && new Date(user.deletedAt).toLocaleDateString(),
            roleId: user.Role.name,
            status: user.status === 1 ? 'Verificado' : 'No verificado',
          };
        });
        this.columns = Object.keys(this.users[0]);
        this.columns = this.columns.filter((column) => column !== 'Role');
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }
}
