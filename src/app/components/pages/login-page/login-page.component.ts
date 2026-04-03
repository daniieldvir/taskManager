import { Component, computed, inject, OnInit } from '@angular/core';
import { LucideUser, LucideUserStar } from '@lucide/angular';
import { User } from '../../../models/user.model';
import { AuthService } from '../../../services/auth.service';
import { TaskService } from '../../../services/task.service';
import { EmployeeCard } from '../../UI/employee-card/employee-card';

@Component({
  selector: 'app-login-page',
  imports: [EmployeeCard],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly taskService = inject(TaskService);

  ngOnInit(): void {
    this.authService.getAllUsers();
  }

  public roles = computed(() => {
    const users = this.authService.allUsers();

    return users?.map((user) => ({
      ...user,
      icon: user.roleType === 'manager' ? LucideUserStar.icon : LucideUser.icon,
    }));
  });

  public selectRole(user: User) {
    this.authService.setLoginUser(user);
    this.taskService.loadForCurrentUser();
  }
}
