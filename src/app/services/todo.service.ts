import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom, of } from 'rxjs';

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

      let token = await firstValueFrom(this.httpClient.post('https://unfwfspring2024.azurewebsites.net/user/login', userData, { headers: headers }));
      localStorage.setItem('token',JSON.stringify(token));
      this.UserLoggedIn.emit(email);
      console.log(token);
      this.router.navigate(['/Todos']);
      return token;
    } catch(error) {
      console.log(error);
      return firstValueFrom(of(null));
    }
  }

  async CreateTodo(title: string, publicAccess: boolean) {
    let todoData = {
      title: title,
      public: publicAccess,
    };
  
    const token = localStorage.getItem('token');
    
    // Check if token is valid
    console.log(token);
  
    let headers: HttpHeaders | undefined;
    
    if (token !== null) {
      headers = new HttpHeaders({
        'Authorization': `Bearer ${JSON.parse(token).token}` // Extract the token value from the object
      });
    }
  
    try {
      if (headers !== undefined) {
        const response = await firstValueFrom(this.httpClient.post('https://unfwfspring2024.azurewebsites.net/todo', todoData, { headers }));
        console.log("Todo created:", response);
        return response;
      } else {
        throw new Error('Token not found in local storage');
      }
    } catch(error) {
      console.error("Error creating todo:", error);
      throw error;
    }
  }
}//end TodoService Class
