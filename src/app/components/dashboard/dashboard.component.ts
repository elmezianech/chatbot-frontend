import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  users: any[] = [];
  errorMessage: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.fetchUsersWithSessions();
  }

  fetchUsersWithSessions(): void {
    this.authService.getUsersWithSessions().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        this.errorMessage = 'Error fetching users and sessions';
        console.error(error);
      }
    );
  }

  deleteUser(userId: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.authService.deleteUser(userId).subscribe(
        (response) => {
          console.log('User deleted:', response);
          this.fetchUsersWithSessions(); // Refresh the user list
        },
        (error) => {
          this.errorMessage = 'Error deleting user';
          console.error(error);
        }
      );
    }
  }
}