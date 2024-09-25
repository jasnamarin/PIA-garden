import { Component } from '@angular/core';
import { OwnerService } from '../services/owner.service';
import { Router } from '@angular/router';
import { ValidationUtils } from '../utils/validation-utils';
import defaultImage from '../../assets/DefaultProfilePicture.json';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  newOwner: any = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    gender: 'F', // Default value
    address: '',
    phone: '',
    email: '',
    creditCard: '',
    profilePicture: '', // This will hold base64-encoded image
  };
  creditCardIcon: string = '';
  defaultProfilePicture: string = ''; // Base64
  errorMessage: string = '';

  constructor(private ownerService: OwnerService, private router: Router) {}

  ngOnInit() {
    this.defaultProfilePicture = (defaultImage as any).defaultProfilePicture;
  }

  // Handle file selection from input
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.newOwner.profilePicture = e.target.result; // Assign Base64 string of the user-uploaded image
      };
      reader.readAsDataURL(file);
    }
  }

  // Submit the form
  signup(): void {
    if (
      !this.newOwner.username ||
      !this.newOwner.password ||
      !this.newOwner.firstName ||
      !this.newOwner.lastName ||
      !this.newOwner.gender ||
      !this.newOwner.address ||
      !this.newOwner.phone ||
      !this.newOwner.email ||
      !this.newOwner.creditCard
    ) {
      this.errorMessage = 'Please fill in all the required fields.';
      return;
    }

    if (this.creditCardIcon == '') {
      this.errorMessage = 'Please enter a valid credit card number.';
      return;
    }

    this.errorMessage = ''; // Clear any previous error message

    // Call the ownerService to register the owner
    this.ownerService.registerOwner(this.newOwner).subscribe(
      (response) => {
        console.log('Owner registered successfully:', response);
        this.router.navigate(['/owner']);
      },
      (error) => {
        console.error('Error registering owner:', error);
        this.errorMessage = error.error?.message || 'Registration failed.';
      }
    );
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
