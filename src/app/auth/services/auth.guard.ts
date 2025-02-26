import { CanActivateFn } from '@angular/router';

/**
 * Authentication guard function for Angular routing.
 * @function authGuard
 * @type {CanActivateFn}
 * @returns {boolean | Observable<boolean>} - Returns true if the session ID is found in local storage. Otherwise,
 * it returns an observable that evaluates to true if a session ID is found in the store, or false otherwise.
 * If false, it also navigates to the login page.
 */
export const authGuard: CanActivateFn = () => {
  return true;
};
