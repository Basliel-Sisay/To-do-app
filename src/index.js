import './style.css';
import {Todo} from './todo.js';
import {project} from './projects.js';
import { controller } from './controller.js';
import {dom} from './dom.js';
import { storage } from './storage.js';
document.addEventListener('DOMContentLoaded', () => {
    const cont = new controller();
    const store = new storage();
    const savedInfo= store.load();
    if(savedInfo){
        savedInfo.projects.forEach(ProjectInfo => {
            const pt = new project(ProjectInfo.name);
            pt.id = ProjectInfo.id;
            pt.todoList = ProjectInfo.todoList.map(info =>{
                return new Todo(info.title, info.description , info.DueDate, info.priority);
            });
            cont.projects.push(pt);
        });
    if(savedInfo.activeProject){
        cont.active = cont.projects.find(proj => proj.id ===savedInfo.activeProject);
    }
}
    const doms = new dom(cont, store);
    doms.listener();
    doms.displayProjects();
    doms.displayList();
    console.log(cont);
    console.log(doms);
}); 
