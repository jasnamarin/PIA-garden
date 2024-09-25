export interface User {
  _id: string;
  username: string;
  password?: string; // Only used for login / password update
  role: 'owner' | 'decorator' | 'admin';
  firstName: string;
  lastName: string;
  gender: 'M' | 'F';
  address: string;
  phone: string;
  email: string;
  profilePicture?: string; // Optional profile picture, could be default instead
  creditCard?: string; // Optional credit card for owners
  status?: 'pending' | 'accepted' | 'declined'; // Optional status field for owners
  firm?: string; // Optional firm for decorators
}
