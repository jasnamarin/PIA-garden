import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-public',
  templateUrl: './login-public.component.html',
  styleUrls: ['./login-public.component.css'],
})
export class LoginPublicComponent {
  constructor(private userService: UserService, private router: Router) {}

  username: string = '';
  password: string = '';
  error: string = '';

  login(event: Event) {
    event.preventDefault(); // Prevent the form from reloading the page

    this.error = ''; // Reset error message

    if (this.username && this.password) {
      this.userService.login(this.username, this.password).subscribe(
        (response) => {
          this.userService.saveTokenAndUser(response.token, response.user);
          console.log(response.message);

          const role = this.userService.getRole();
          if (role === 'owner') {
            this.router.navigate(['/owner']);
          } else if (role === 'decorator') {
            this.router.navigate(['/decorator']);
          } else if (role === 'admin') {
            this.router.navigate(['/admin']);
          } else {
            this.error = 'Invalid role.';
          }
        },
        (err) => {
          console.error(err);
          this.error = 'Login unsuccessful, please try again.';
        }
      );
    } else {
      this.error = 'Please enter both username and password.';
    }
  }
}
