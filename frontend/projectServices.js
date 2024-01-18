/**
 * @typedef User
 * @property id {number}
 * @property name {string}
 * @property email {string}
 * @property password {string}
 * @property repeatPAssword {string}
 * @property date {number} - date timestamp at UTC midnight
 */

let lastCreateAccountId = -1;
/**
 * Creates new Meetup object with temp negative id
 * @return {User}
 */

export function createAccount() {
  return {
    id: lastCreateAccountId++,
    name: '',
    email: '',
    password: '',
    repeatPAssword: '',
    date: new Date().setUTCHours(0, 0, 0, 0),
  };
}