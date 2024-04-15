import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(private httpClient: HttpClient, private router: Router) {
    
  }

  UserLoggedIn:EventEmitter<string>= new EventEmitter<string>();

  async RegisterUser(email: string, password: string, name:string){

    let userData = {
     
      email: email,
      password: password,
      name: name,
    }
    try{
      let response = await firstValueFrom(this.httpClient.post('https://unfwfspring2024.azurewebsites.net/user/', userData))
      console.log(response);
      this.router.navigate(['/Home']);
      return true;
    }
    catch(error){
      console.log(error);
      return false;
    }
    
  }//end Register User method

  async LoginUser(email: string, password: string){
    let userData = {
      email: email,
      password: password,
    };

    try{
      const headers = new HttpHeaders({
        'Authorization': 'Basic ' + btoa(`${email}:${password}`)//used stack overflow for this - https://stackoverflow.com/questions/53613529/angular-6-http-get-request-with-http-basic-authentication
      });

      let authToken = await firstValueFrom(this.httpClient.post('https://unfwfspring2024.azurewebsites.net/user/login', userData, { headers: headers }));
      localStorage.setItem('currentUserToken',JSON.stringify(userData));
      this.UserLoggedIn.emit(email);
      console.log(authToken);
      this.router.navigate(['/Todos']);
      return true;
    } catch(error) {
      console.log(error);
      return false;
    }
  }

  // async GetTodos(){

  //   let user = localStorage.getItem()

  // }
}//end TodoService Class
