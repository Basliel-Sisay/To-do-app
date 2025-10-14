export class controller{
    constructor(){
        this.projects = [];
        this.active = null;
    }
    create(project){
        this.projects.push(project);
        if(!this.active){
            this.active = project;
        }
    }
    check(project){
        this.active = this.projects.find((list) =>list.id ===project);
    }
} 
    