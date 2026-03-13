/**
 * 📋 Jugaad Form Validator - Indian Style!
 *
 * India mein form bharna ek art hai! College admission ka form validate
 * karna hai. Har field ke apne rules hain. Tujhe ek errors object return
 * karna hai jisme galat fields ke error messages hain. Agar sab sahi hai
 * toh empty errors object aur isValid = true.
 *
 * formData object:
 *   { name, email, phone, age, pincode, state, agreeTerms }
 *
 * Validation Rules:
 *   1. name: must be a non-empty trimmed string, min 2 chars, max 50 chars
 *      Error: "Name must be 2-50 characters"
 *
 *   2. email: must be a string containing exactly one "@" and at least one "."
 *      after the "@". Use indexOf(), lastIndexOf(), includes().
 *      Error: "Invalid email format"
 *
 *   3. phone: must be a string of exactly 10 digits, starting with 6, 7, 8, or 9
 *      (Indian mobile numbers). Check each char is a digit.
 *      Error: "Invalid Indian phone number"
 *
 *   4. age: must be a number between 16 and 100 inclusive, and an integer.
 *      JUGAAD: Agar string mein number diya hai (e.g., "22"), toh parseInt()
 *      se convert karo. Agar convert nahi ho paya (isNaN), toh error.
 *      Error: "Age must be an integer between 16 and 100"
 *
 *   5. pincode: must be a string of exactly 6 digits, NOT starting with "0"
 *      Error: "Invalid Indian pincode"
 *
 *   6. state: Use optional chaining (?.) and nullish coalescing (??) -
 *      if state is null/undefined, treat as "". Must be a non-empty string.
 *      Error: "State is required"
 *
 *   7. agreeTerms: must be truthy (Boolean(agreeTerms) === true).
 *      Falsy values: 0, "", null, undefined, NaN, false
 *      Error: "Must agree to terms"
 *
 * Return:
 *   { isValid: boolean, errors: { fieldName: "error message", ... } }
 *   - isValid is true ONLY when errors object has zero keys
 *
 * Hint: Use typeof, Boolean(), parseInt(), isNaN(), Number.isInteger(),
 *   ?. (optional chaining), ?? (nullish coalescing), Object.keys(),
 *   startsWith(), trim(), length
 *
 * @param {object} formData - Form fields to validate
 * @returns {{ isValid: boolean, errors: object }}
 *
 * @example
 *   validateForm({
 *     name: "Rahul Sharma", email: "rahul@gmail.com", phone: "9876543210",
 *     age: 20, pincode: "400001", state: "Maharashtra", agreeTerms: true
 *   })
 *   // => { isValid: true, errors: {} }
 *
 *   validateForm({
 *     name: "", email: "bad-email", phone: "12345", age: 10,
 *     pincode: "0123", state: null, agreeTerms: false
 *   })
 *   // => { isValid: false, errors: { name: "...", email: "...", ... } }
 */
export function validateForm(formData) {
  // Your code here
const errors = {};

  // Safe fallback in case formData itself is missing
  const data = formData ?? {};

  // 1. name validation
  const name = typeof data.name === "string" ? data.name.trim() : "";
  if (name.length < 2 || name.length > 50) {
    errors.name = "Name must be 2-50 characters";
  }

  // 2. email validation
  const email = typeof data.email === "string" ? data.email.trim() : "";
  const atIndex = email.indexOf("@");
  const lastAtIndex = email.lastIndexOf("@");
  const dotAfterAt = email.indexOf(".", atIndex + 1);

  if (
    atIndex === -1 ||
    atIndex !== lastAtIndex ||
    !email.includes("@") ||
    dotAfterAt === -1
  ) {
    errors.email = "Invalid email format";
  }

  // 3. phone validation
  const phone = typeof data.phone === "string" ? data.phone.trim() : "";
  const validPhoneStart =
    phone.startsWith("6") ||
    phone.startsWith("7") ||
    phone.startsWith("8") ||
    phone.startsWith("9");

  let allPhoneDigits = true;
  for (let i = 0; i < phone.length; i++) {
    if (phone[i] < "0" || phone[i] > "9") {
      allPhoneDigits = false;
      break;
    }
  }

  if (phone.length !== 10 || !validPhoneStart || !allPhoneDigits) {
    errors.phone = "Invalid Indian phone number";
  }

  // 4. age validation
  let age = data.age;
  if (typeof age === "string") {
    age = parseInt(age, 10);
  }

  if (
    isNaN(age) ||
    !Number.isInteger(age) ||
    age < 16 ||
    age > 100
  ) {
    errors.age = "Age must be an integer between 16 and 100";
  }

  // 5. pincode validation
  const pincode = typeof data.pincode === "string" ? data.pincode.trim() : "";

  let allPincodeDigits = true;
  for (let i = 0; i < pincode.length; i++) {
    if (pincode[i] < "0" || pincode[i] > "9") {
      allPincodeDigits = false;
      break;
    }
  }

  if (
    pincode.length !== 6 ||
    pincode.startsWith("0") ||
    !allPincodeDigits
  ) {
    errors.pincode = "Invalid Indian pincode";
  }

  // 6. state validation using optional chaining + nullish coalescing
  const state = data?.state?.trim?.() ?? "";
  if (state.length === 0) {
    errors.state = "State is required";
  }

  // 7. agreeTerms validation
  if (Boolean(data.agreeTerms) !== true) {
    errors.agreeTerms = "Must agree to terms";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };




}
