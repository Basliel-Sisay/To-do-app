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
    remove(projectId){
        const index = this.projects.findIndex(project => project.id === projectId);
        if(index !== -1){
           if(this.active && this.active.id === projectId){
              this.active = null;
           }
           this.projects.splice(index, 1);
        }
     }
} 
    