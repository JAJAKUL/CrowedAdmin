import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService {

  constructor() { }
  gettoken() {
    // console.log('!!localStorage.getItem(isLoggedin)', !!localStorage.getItem('isLoggedin'))
     return !!localStorage.getItem('isLoggedin');
     }
}
