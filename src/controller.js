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
    remove(project){
       const proj = this.projects.findIndex(list => list.id === project);
       if(proj !==-1){
        if(this.active && this.active.id === project){
            this.active = null;
        }
        this.projects.splice(proj,1);
       }
    }
    check(project){
        this.active = this.projects.find(list =>list.id ===project);
    }
} 