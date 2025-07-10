export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export interface FormErrors {
  [key: string]: string;
}

// Email validation
export const validateEmail = (email: string): ValidationResult => {
  if (!email.trim()) {
    return { isValid: false, error: "Email is required" };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: "Please enter a valid email address" };
  }

  return { isValid: true };
};

// Password validation
export const validatePassword = (password: string): ValidationResult => {
  if (!password) {
    return { isValid: false, error: "Password is required" };
  }

  if (password.length < 6) {
    return {
      isValid: false,
      error: "Password must be at least 6 characters long",
    };
  }

  if (password.length > 50) {
    return {
      isValid: false,
      error: "Password must be less than 50 characters",
    };
  }

  // Check for at least one letter and one number for strong password
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /\d/.test(password);

  if (!hasLetter || !hasNumber) {
    return {
      isValid: false,
      error: "Password must contain at least one letter and one number",
    };
  }

  return { isValid: true };
};

// Name validation
export const validateName = (name: string): ValidationResult => {
  if (!name.trim()) {
    return { isValid: false, error: "Name is required" };
  }

  if (name.trim().length < 2) {
    return { isValid: false, error: "Name must be at least 2 characters long" };
  }

  if (name.trim().length > 50) {
    return { isValid: false, error: "Name must be less than 50 characters" };
  }

  // Check for valid name characters (letters, spaces, hyphens, apostrophes)
  const nameRegex = /^[a-zA-Z\s\-']+$/;
  if (!nameRegex.test(name.trim())) {
    return {
      isValid: false,
      error: "Name can only contain letters, spaces, hyphens, and apostrophes",
    };
  }

  return { isValid: true };
};

// Amount validation
export const validateAmount = (
  amount: string,
  minAmount: number = 1,
  maxAmount: number = 1000000,
): ValidationResult => {
  if (!amount.trim()) {
    return { isValid: false, error: "Amount is required" };
  }

  const numericAmount = parseFloat(amount);

  if (isNaN(numericAmount)) {
    return { isValid: false, error: "Please enter a valid amount" };
  }

  if (numericAmount <= 0) {
    return { isValid: false, error: "Amount must be greater than 0" };
  }

  if (numericAmount < minAmount) {
    return { isValid: false, error: `Minimum amount is ₹${minAmount}` };
  }

  if (numericAmount > maxAmount) {
    return { isValid: false, error: `Maximum amount is ₹${maxAmount}` };
  }

  // Check for maximum 2 decimal places
  const decimalPlaces = (amount.split(".")[1] || "").length;
  if (decimalPlaces > 2) {
    return {
      isValid: false,
      error: "Amount can have maximum 2 decimal places",
    };
  }

  return { isValid: true };
};

// Referral code validation
export const validateReferralCode = (code: string): ValidationResult => {
  if (!code.trim()) {
    return { isValid: true }; // Referral code is optional
  }

  if (code.length !== 6) {
    return {
      isValid: false,
      error: "Referral code must be exactly 6 characters",
    };
  }

  const codeRegex = /^[A-Z0-9]+$/;
  if (!codeRegex.test(code)) {
    return {
      isValid: false,
      error: "Referral code can only contain uppercase letters and numbers",
    };
  }

  return { isValid: true };
};

// UPI ID validation
export const validateUPI = (upiId: string): ValidationResult => {
  if (!upiId.trim()) {
    return { isValid: false, error: "UPI ID is required" };
  }

  // UPI ID format: username@bankname
  const upiRegex = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/;
  if (!upiRegex.test(upiId)) {
    return {
      isValid: false,
      error: "Please enter a valid UPI ID (e.g., username@paytm)",
    };
  }

  return { isValid: true };
};

// Bank account number validation
export const validateAccountNumber = (
  accountNumber: string,
): ValidationResult => {
  if (!accountNumber.trim()) {
    return { isValid: false, error: "Account number is required" };
  }

  // Remove spaces and check if it's numeric
  const cleanAccountNumber = accountNumber.replace(/\s/g, "");
  const accountRegex = /^\d{9,18}$/;

  if (!accountRegex.test(cleanAccountNumber)) {
    return { isValid: false, error: "Account number must be 9-18 digits" };
  }

  return { isValid: true };
};

// IFSC code validation
export const validateIFSC = (ifsc: string): ValidationResult => {
  if (!ifsc.trim()) {
    return { isValid: false, error: "IFSC code is required" };
  }

  // IFSC format: First 4 characters are alphabets, 5th character is 0, last 6 characters are alphanumeric
  const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
  if (!ifscRegex.test(ifsc.toUpperCase())) {
    return {
      isValid: false,
      error: "Please enter a valid IFSC code (e.g., SBIN0001234)",
    };
  }

  return { isValid: true };
};

// PayPal email validation
export const validatePayPalEmail = (email: string): ValidationResult => {
  if (!email.trim()) {
    return { isValid: false, error: "PayPal email is required" };
  }

  return validateEmail(email);
};

// Generic required field validation
export const validateRequired = (
  value: string,
  fieldName: string,
): ValidationResult => {
  if (!value.trim()) {
    return { isValid: false, error: `${fieldName} is required` };
  }

  return { isValid: true };
};

// Form validation helper
export const validateForm = (
  fields: { [key: string]: any },
  validators: { [key: string]: (value: any) => ValidationResult },
): { isValid: boolean; errors: FormErrors } => {
  const errors: FormErrors = {};
  let isValid = true;

  Object.keys(validators).forEach((fieldName) => {
    const fieldValue = fields[fieldName];
    const validator = validators[fieldName];
    const result = validator(fieldValue);

    if (!result.isValid) {
      errors[fieldName] = result.error || "";
      isValid = false;
    }
  });

  return { isValid, errors };
};

// Real-time validation helper for single field
export const validateField = (
  value: any,
  validator: (value: any) => ValidationResult,
): string => {
  const result = validator(value);
  return result.isValid ? "" : result.error || "";
};

// Check if user balance is sufficient
export const validateSufficientBalance = (
  amount: string,
  availableBalance: number,
): ValidationResult => {
  const numericAmount = parseFloat(amount);

  if (isNaN(numericAmount)) {
    return { isValid: false, error: "Invalid amount" };
  }

  if (numericAmount > availableBalance) {
    return {
      isValid: false,
      error: `Insufficient balance. Available: ₹${availableBalance}`,
    };
  }

  return { isValid: true };
};
