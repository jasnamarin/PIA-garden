import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { User } from '../models/user.model';
import { Firm } from '../models/firm.model';
import { ValidationUtils } from '../utils/validation-utils';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  owners: User[] = [];
  decorators: User[] = [];
  pendingOwners: User[] = [];
  firms: Firm[] = [];

  newDecorator: Partial<User> = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    gender: undefined,
    address: '',
    phone: '',
    email: '',
  };
  errorMessage: string = '';

  newFirm: Firm = {
    _id: '',
    name: '',
    address: '',
    phone: '',
    services: [],
    location: '',
    holidayPeriod: '',
    decorators: [],
  };
  firmErrorMessage: string = '';
  dropdownOpen = false; // Control the visibility of the decorator dropdown

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.fetchOwners();
    this.fetchDecorators();
    this.fetchPendingOwners();
    this.fetchFirms();
  }

  // Fetch all owners
  fetchOwners(): void {
    this.adminService.getAllOwners().subscribe(
      (owners) => (this.owners = owners),
      (err) => console.error(err)
    );
  }

  // Fetch all decorators
  fetchDecorators(): void {
    this.adminService.getAllDecorators().subscribe(
      (decorators) => (this.decorators = decorators),
      (err) => console.error(err)
    );
  }

  // Fetch pending owner registration requests
  fetchPendingOwners(): void {
    this.adminService.getOwnerRequests().subscribe(
      (pendingOwners) => (this.pendingOwners = pendingOwners),
      (err) => console.error(err)
    );
  }

  // Fetch all firms
  fetchFirms(): void {
    this.adminService.getFirms().subscribe(
      (firms) => (this.firms = firms),
      (err) => console.error(err)
    );
  }

  // Accept an owner registration request
  acceptOwner(userId: string): void {
    this.adminService.acceptOwnerRequest(userId).subscribe(
      (res) => this.fetchPendingOwners(),
      (err) => console.error(err)
    );
  }

  // Decline an owner registration request
  declineOwner(userId: string): void {
    this.adminService.declineOwnerRequest(userId).subscribe(
      (res) => this.fetchPendingOwners(),
      (err) => console.error(err)
    );
  }

  // Update user data
  updateUser(userId: string, updates: Partial<User>): void {
    this.adminService.updateUser(userId, updates).subscribe(
      (updatedUser) => {
        console.log('User updated:', updatedUser);
        this.fetchOwners();
        this.fetchDecorators();
      },
      (err) => console.error(err)
    );
  }

  // Add a new decorator
  addNewDecorator(): void {
    if (
      !this.newDecorator.username ||
      !this.newDecorator.password ||
      !this.newDecorator.firstName ||
      !this.newDecorator.lastName ||
      !this.newDecorator.gender ||
      !this.newDecorator.address ||
      !this.newDecorator.phone ||
      !this.newDecorator.email
    ) {
      this.errorMessage = 'Please fill in all the required fields.';
      return;
    }

    if (!ValidationUtils.validatePassword(this.newDecorator.password)) {
      this.errorMessage =
        'Password must be 6-10 characters long, contain at least one uppercase letter, three lowercase letters, one number, one special character, and start with a letter.';
      return;
    }

    // Clear error message if validation passes
    this.errorMessage = '';

    this.adminService.addDecorator(this.newDecorator).subscribe(
      (addedDecorator) => {
        console.log('Decorator added:', addedDecorator);
        this.fetchDecorators(); // Refresh the list after adding
        this.newDecorator = {}; // Reset form
      },
      (err) => {
        console.error(err);
        this.errorMessage = 'Error adding decorator. Please try again.';
      }
    );
  }

  // Add a new service to the list
  addService(): void {
    this.newFirm.services.push({ serviceName: '', price: 0 });
  }

  // Remove a service from the list
  removeService(index: number): void {
    this.newFirm.services.splice(index, 1);
  }

  // Add new firm
  addNewFirm(): void {
    if (this.newFirm.decorators.length < 2) {
      this.firmErrorMessage = 'You must select at least 2 decorators';
      return;
    }

    console.log('New firm: ' + this.newFirm);

    this.adminService.addFirm(this.newFirm).subscribe(
      (addedFirm) => {
        console.log('Firm added:', addedFirm);
        // Reset form after successful submission
        this.newFirm = {
          _id: '',
          name: '',
          address: '',
          phone: '',
          services: [],
          location: '',
          holidayPeriod: '',
          decorators: [],
        };
        this.firmErrorMessage = '';
      },
      (error) => {
        console.error(error);
        this.firmErrorMessage = 'Error adding firm. Please try again.';
      }
    );
  }

  // Toggle the dropdown visibility
  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  // Check if a decorator is selected
  isDecoratorSelected(decoratorId: string): boolean {
    return this.newFirm.decorators.includes(decoratorId);
  }

  // Select or Deselect a decorator when clicked
  selectDecorator(decoratorId: string, event: Event): void {
    event.stopPropagation(); // Prevent closing the dropdown

    const index = this.newFirm.decorators.indexOf(decoratorId);
    if (index === -1) {
      this.newFirm.decorators.push(decoratorId); // Select decorator
    } else {
      this.newFirm.decorators.splice(index, 1); // Deselect decorator
    }
  }
}
