import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isLoginMode: boolean = false;
  

  toggleLogin() {
    this.isLoginMode = !this.isLoginMode;
  }
}