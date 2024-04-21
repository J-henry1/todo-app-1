import { Component } from '@angular/core';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isLoginMode: boolean = false;
  
  constructor(private TodoServices: TodoService){

  }//end constructor

  ngOnInit(): void {
    this.TodoServices.UserLoggedIn.subscribe((loggedIn: boolean) => {
      this.isLoginMode = loggedIn;
      if (this.isLoginMode) {
        // Perform any actions you want when the user is logged in
      } else console.log('User is not logged in!');
    });
  }

  toggleLogin() {
    this.isLoginMode = !this.isLoginMode;
  }
}