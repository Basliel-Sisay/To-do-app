export class Todo{
    constructor(title,description,DueDate,priority){
        this.title = title;
        this.description = description;
        this.DueDate = DueDate;
        this.priority= priority;
        this.id = crypto.randomUUID();
        this.done = false;
    }
    change(){
        this.done = !this.done;
        return this.done;
    }
}
