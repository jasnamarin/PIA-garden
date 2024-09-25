import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { ValidationUtils } from '../utils/validation-utils';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.css'],
})
export class OwnerComponent implements OnInit {
  selectedMenu: string = 'profile'; // Default to 'profile' menu
  isEditing: boolean = false; // To track if the user is editing their profile

  owner: Partial<User> = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    creditCard: '',
    profilePicture: '',
  };
  creditCardIcon: string = '';
  message: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  // Load owner's profile data from localStorage
  loadProfile(): void {
    const userData = this.userService.getUserData();
    if (userData) this.owner = userData;
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
        this.owner.profilePicture = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  updateUser(updates: Partial<User>): void {
    if (!this.owner._id || !this.owner.creditCard) {
      console.log('Udefined user.');
      return;
    }

    this.validateCreditCard(this.owner.creditCard);
    if (this.creditCardIcon == '') {
      this.message = 'Please enter a valid credit card number.';
      return;
    }

    this.message = ''; // Clear any previous error message

    this.userService.updateUser(this.owner._id, updates).subscribe(
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

  // Validate the credit card number and set the icon accordingly
  validateCreditCard(cardNumber: string): void {
    const cardType = ValidationUtils.validateCreditCard(cardNumber);
    switch (cardType) {
      case 'diners':
        this.creditCardIcon = '../assets/diners.svg';
        break;
      case 'mastercard':
        this.creditCardIcon = '../assets/mastercard.svg';
        break;
      case 'visa':
        this.creditCardIcon = '../assets/visa.svg';
        break;
      default:
        this.creditCardIcon = ''; // No valid card
    }
  }
}
