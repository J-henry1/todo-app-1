export class Todo {
    id: number;
    title: string;
    created_at: Date;
    public: boolean;
    created_by: number;
  
    constructor(id: number, title: string, created_at: Date, public_access: boolean, created_by: number) {
      this.id = id;
      this.title = title;
      this.created_at = created_at;
      this.public = public_access;
      this.created_by = created_by;
    }

   
  }

  export class Todos {
    todos: Todo[];
  
    constructor(todos: Todo[]) {
      this.todos = todos;
    }
  }
