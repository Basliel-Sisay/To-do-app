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
        const ids = this.todoList.findIndex(todo=> todo.id === id);
        if (ids !== -1){
            this.todoList.splice(ids, 1);
        }
        else{
            throw new Error('There is no match with this ID');
        }
    }
}