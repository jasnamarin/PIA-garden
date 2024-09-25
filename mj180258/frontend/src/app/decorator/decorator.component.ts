import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-decorator',
  templateUrl: './decorator.component.html',
  styleUrls: ['./decorator.component.css'],
})
export class DecoratorComponent implements OnInit {
  selectedMenu: string = 'profile'; // Default to 'profile' menu
  isEditing: boolean = false; // To track if the user is editing their profile

  decorator: Partial<User> = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    profilePicture: '',
  };
  message: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  // Load decorator's profile data from localStorage
  loadProfile(): void {
    const userData = this.userService.getUserData();
    if (userData) this.decorator = userData;
  }

  enableEditing(): void {
    this.isEditing = true;
  }

  // Handle file input for profile picture
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.decorator.profilePicture = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  updateUser(updates: Partial<User>): void {
    if (!this.decorator._id) {
      console.log('Undefined user.');
      return;
    }

    this.message = ''; // Clear any previous error message

    this.userService.updateUser(this.decorator._id, updates).subscribe(
      (updatedUser) => {
        this.isEditing = false;
        console.log('Profile updated:', updatedUser);
      },
      (err) => console.error('Error updating profile:', err)
    );
  }

  // Switch between menu items
  selectMenu(menuItem: string): void {
    this.selectedMenu = menuItem;
  }
}
