import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom, of } from 'rxjs';
import {SharedTodoUser, Todo} from '../models/todos/todos';
import { jwtDecode } from 'jwt-decode';
import { User } from '../models/user/user';


@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(private httpClient: HttpClient, private router: Router) {
    
  }

  UserLoggedIn:EventEmitter<boolean>= new EventEmitter<boolean>();
  ItemDeleted: EventEmitter<string> = new EventEmitter<string>();

  TodoList: Todo[] = [];
  User: User| undefined;
  SharedTodoUser: SharedTodoUser | undefined;



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
        Authorization: 'Basic ' + btoa(`${email}:${password}`)//used stack overflow for this - https://stackoverflow.com/questions/53613529/angular-6-http-get-request-with-http-basic-authentication
      });

      let token = await firstValueFrom(this.httpClient.post('https://unfwfspring2024.azurewebsites.net/user/login', userData, { headers: headers }));
      localStorage.setItem('token',JSON.stringify(token));
      this.UserLoggedIn.emit(true);
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
      public_list: publicAccess,
    };
  
    // Get the token from local storage
    const token = localStorage.getItem('token');
    
    // Check if token is valid
    console.log(token);
  
    let headers: HttpHeaders | undefined;
    
    
    // Check if token is valid
    if (token !== null) {
      headers = new HttpHeaders({
        'Authorization': `Bearer ${JSON.parse(token).token}` // Extract the token value from the object
      });
    }
    //try to create the todo list
    try {
      if (headers !== undefined) {
        const response = await firstValueFrom(this.httpClient.post('https://unfwfspring2024.azurewebsites.net/todo', todoData, { headers }));
        console.log("Todo created:", response);
        this.router.navigate(['/View']);
        return response;
      } else {
        throw new Error('Token not found in local storage');
      }
    } catch(error) {
      console.error("Error creating todo:", error);
      throw error;
    }
  }

  async GetTodos():Promise<Todo[]>{
     const token = localStorage.getItem('token');
    
     let headers: HttpHeaders | undefined;

     if (token !== null) {
      headers = new HttpHeaders({
        'Authorization': `Bearer ${JSON.parse(token).token}` // Extract the token value from the object
      });
     }//end check for token
     
     try{
      if (headers !== undefined) {
        const response = await firstValueFrom(this.httpClient.get<Todo[]>('https://unfwfspring2024.azurewebsites.net/todo',{ headers }));
        for(let row of response){
          this.TodoList.push(row);
        }
        console.log(response);
        return this.TodoList;
      } else {
        const response = await firstValueFrom(this.httpClient.get<Todo[]>('https://unfwfspring2024.azurewebsites.net/todo'));
        for(let row of response){
          this.TodoList.push(row);
        }
        console.log(response);
        return this.TodoList;
      }
     }
     catch(error){
       console.log(error);
       throw error;
     }
    }
  async GetUser():Promise<User>{
    const token = localStorage.getItem('token');

    let headers: HttpHeaders | undefined;

    if (token !== null) {
     headers = new HttpHeaders({
       'Authorization': `Bearer ${JSON.parse(token).token}` // Extract the token value from the object
     });
    }

    try{
      let response = await firstValueFrom(this.httpClient.get<User>('https://unfwfspring2024.azurewebsites.net/user', { headers }));
      console.log(response);
      return response;
    }
    catch(error){
      throw error;
    }

  }

  async UpdateUser(email: string, password: string, name:string):Promise<any>{

    let userData = {
      name: name,
      email: email,
      password: password,
    }

    const token = localStorage.getItem('token');

    let headers: HttpHeaders | undefined;

    if (token !== null) {
     headers = new HttpHeaders({
       'Authorization': `Bearer ${JSON.parse(token).token}` // Extract the token value from the object
     });
    }


    try{
      let response = await firstValueFrom(this.httpClient.patch('https://unfwfspring2024.azurewebsites.net/user', userData, {headers}));
      console.log(response);
      this.router.navigate(['/Home']);
      return response;
    }
    catch(error){
      throw error;
    }
  }

  async UpdateTodo(listid: number, title: string, publicAccess: boolean){
    let todoData = {
      listid: listid,
      title: title,
      public_list: publicAccess,
    }

    const token = localStorage.getItem('token');

    let headers: HttpHeaders | undefined;

    try{
      if (token !== null) {
        headers = new HttpHeaders({
          'Authorization': `Bearer ${JSON.parse(token).token}` // Extract the token value from the object
        });
      }
      let response = await firstValueFrom(this.httpClient.patch(`https://unfwfspring2024.azurewebsites.net/todo/${listid}`, todoData, {headers}));
      console.log(response);
      this.router.navigate(['/View']);
      return response;
    }
    catch(error){
      throw error;
    }
  }

  async DeleteTodo(listid: number){

    
    let todoData = {
      listid: listid,
    }

    const token = localStorage.getItem('token');

    let headers: HttpHeaders | undefined;
    try{
      if (token !== null) {
        headers = new HttpHeaders({
          'Authorization': `Bearer ${JSON.parse(token).token}` // Extract the token value from the object
        });
      }
      let response = await firstValueFrom(this.httpClient.delete(`https://unfwfspring2024.azurewebsites.net/todo/${listid}`, {headers}));
      console.log(response);
      this.ItemDeleted.emit(`${listid} Item Deleted`);
      this.router.navigate(['/View']);
      return response;
    }
    catch(error){
      throw error;
    }
  }

  async ShareTodo(listid: number, email: SharedTodoUser){
    let userData = {
      email: email,
      listid: listid
    }

    const token = localStorage.getItem('token');

    let headers: HttpHeaders | undefined;
    try{
      if (token !== null) {
        headers = new HttpHeaders({
          'Authorization': `Bearer ${JSON.parse(token).token}` // Extract the token value from the object
        });
      }
      let response = await firstValueFrom(this.httpClient.post(`https://unfwfspring2024.azurewebsites.net/todo/${listid}/share`, userData.email, {headers}));
      console.log(response);
      this.router.navigate(['/View']);
      return response;
    }
    catch(error){
      throw error;
    }

  }


}//end TodoService Class
