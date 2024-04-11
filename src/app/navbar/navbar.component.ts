import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  showCreateAccount: boolean = false;
  isLoginMode: boolean = false;

  toggleCreateAccount() {
    this.showCreateAccount = !this.showCreateAccount;
    this.isLoginMode = false; 
  }

  toggleLogin() {
    this.isLoginMode = !this.isLoginMode;
    this.showCreateAccount = false;
  }

}