export class project{
    constructor(name){
        this.name = name;
        this.id = crypto.randomUUID();
        this.todoList=[];
    }
    add(todo){
        this.todoList.push(todo);
    }
    remove(id){
        this.todoList= this.todoList.filter((t)=> t.id !== id);
    }
}