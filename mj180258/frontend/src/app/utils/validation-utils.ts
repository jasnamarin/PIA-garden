export class ValidationUtils {
  // Method to validate password
  static validatePassword(password: string): boolean {
    // Main regex check: starts with a letter, followed by 5-9 characters
    const basicPasswordRegex: RegExp = /^[a-zA-Z][A-Za-z\d!@#$%^&*]{5,9}$/;

    if (!basicPasswordRegex.test(password)) {
      return false; // Fails basic requirements
    }

    // Check for at least 1 uppercase letter
    if (!/[A-Z]/.test(password)) {
      return false;
    }

    // Check for at least 3 lowercase letters
    const lowercaseMatches = password.match(/[a-z]/g);
    if (!lowercaseMatches || lowercaseMatches.length < 3) {
      return false;
    }

    // Check for at least 1 number
    if (!/\d/.test(password)) {
      return false;
    }

    // Check for at least 1 special character
    return /[!@#$%^&*]/.test(password) ? true : false;
  }

  // Method to validate credit card and return its type
  static validateCreditCard(cardNumber: string): string | null {
    // Regular expressions for credit card validation
    const dinersRegex: RegExp = /^(300|301|302|303|36|38)\d{12}$/;
    const masterCardRegex: RegExp = /^(51|52|53|54|55)\d{14}$/;
    const visaRegex: RegExp = /^(4539|4556|4916|4532|4929|4485|4716)\d{12}$/;

    if (dinersRegex.test(cardNumber)) {
      return 'diners';
    } else if (masterCardRegex.test(cardNumber)) {
      return 'mastercard';
    } else if (visaRegex.test(cardNumber)) {
      return 'visa';
    }
    return null; // Invalid card number
  }
}
