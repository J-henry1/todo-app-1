export class Todo {
  id: number;
  title: string;
  created_at: Date;
  public_list: boolean; 
  created_by: number;
  list_items: TodoItems[] = [];
  shared_with: SharedTodoUser[] = [];
  
  constructor(id: number, title: string, created_at: Date, public_list: boolean, created_by: number) {
    this.id = id;
    this.title = title;
    this.created_at = created_at;
    this.public_list = public_list;
    this.created_by = created_by;
    this.list_items = [];
    this.shared_with = [];
    
  }
}

export class Completed_By_User{
  email: string = '';
  name: string = '';

  constructor(email:string, name: string){
      this.email = email;
      this.name = name;
  }
}


export class TodoItems {
  id: number = 0;
  task: string = '';
  completed_date: Date = new Date();
  completed: boolean = false;
  created_at: Date = new Date();
  updated_at: Date = new Date();
  due_date: Date = new Date();
  list_id: number = 0;
  completed_by_user: Completed_By_User;

  constructor(task: string, completed: boolean, completed_date: Date, created_at: Date, updated_at: Date, due_date: Date, list_id: number, completed_by_user: Completed_By_User) {
      this.task = task;
      this.completed = completed;
      this.created_at = new Date();
      this.updated_at = new Date();
      this.due_date = new Date();
      this.list_id = list_id;
      this.completed_by_user = completed_by_user;
      // this.id = 0;
  }
}//end TodoItems   

  export class SharedTodoUser{
    email: string;

    constructor(email: string){
      this.email = email;
    }
  }
