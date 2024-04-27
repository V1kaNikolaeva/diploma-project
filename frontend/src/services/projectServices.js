/**
 * @typedef User
 * @property id {number}
 * @property name {string}
 * @property email {string}
 * @property password {string}
 * @property repeatPassword {string}
 * @property date {number} - date timestamp at UTC midnight
 */

let lastCreateUserId = -1;
/**
 * Creates new User object with temp negative id
 * @return {User}
 */

export function signupUser() {
  return {
    id: lastCreateUserId--,
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
    date: new Date().setUTCHours(0, 0, 0, 0),
  };
}

export function loginUser() {
  return {
    email: '',
    password: '',
  }
}

export function balance() {
  return {
    balance: 1000,
  }
}