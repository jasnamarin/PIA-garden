export interface Firm {
  _id: string;
  name: string;
  address: string;
  phone: string;
  services: {
    // Instead of defining a new interface for services:
    serviceName: string;
    price: number;
  }[];
  location: string;
  holidayPeriod: string;
  decorators: string[]; // Array of decorator ObjectIds
}
