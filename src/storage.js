//import { controller } from "./controller";

export class storage{
   save(controller){
    let activeId;
    if(controller.active){
        activeId= controller.active.id;
    }
    else{
        activeId= null;
    };
    const store ={
        projects : controller.projects,
        activeProject: activeId
    };
    localStorage.setItem('ToDoAppStore' , JSON.stringify(store));
   }
   load(){
    const saved = localStorage.getItem('ToDoAppStore');
    if(!saved){
        return null;
    }
    return JSON.parse(saved);
   }
}