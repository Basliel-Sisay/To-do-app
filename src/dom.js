import { project} from "./projects.js";
import { Todo} from "./todo.js";
export class dom{
    constructor(control){
        this.controller = control;
        this.list = document.querySelector('.projects-list');
        this.container= document.querySelector('.todo-container');
        this.addList= document.querySelector('#add-button');
        this.addNew= document.querySelector('#add');
    }
    displayProjects(){
        this.controller.projects.forEach(li => {
            const Projectlist = document.createElement('p');
            const projs = document.createElement('div');
            const projsNumber = document.createElement('span');
            Projectlist.innerHTML= li.name;
            projs.style.display = 'flex';
            projs.style.justifyContent = 'space-between';
            projs.style.alignItems = 'center';
            projs.style.padding = '12px 15px';
            projs.style.margin = '8px 0';
            projs.style.borderRadius = '8px';
            projs.style.backgroundColor = 'rgb(52, 152, 219)';
            projs.style.color = 'rgb(255, 255, 255)';
            projs.style.cursor = 'pointer';
            projs.style.transition = 'all 0.3s ease';
            projs.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
            projsNumber.style.fontWeight = 'bold';
            projsNumber.style.fontSize = '15px';
            projsNumber.style.backgroundColor = 'rgb(255, 255, 255)';
            projsNumber.style.color = 'rgb(52, 152, 219)';
            projsNumber.style.padding = '4px 8px';
            projsNumber.style.borderRadius = '12px';
            projsNumber.style.fontSize = '13px';
            projsNumber.style.fontWeight = 'bold';
            projsNumber.style.minWidth = '30px';
            projsNumber.style.textAlign = 'center';
            projs.addEventListener('mouseenter', () => {
                projs.style.backgroundColor = 'rgb(41, 128, 185)';
                projs.style.transform = 'translateX(5px)';
            });
            projs.addEventListener('mouseleave', () => {
                projs.style.backgroundColor = 'rgb(52, 152, 219)';
                projs.style.transform = 'translateX(0)';
            });
            projs.addEventListener('click', () => {
                this.controller.check(li.id);
                this.displayList();
            });
            projs.appendChild(Projectlist);
            projs.appendChild(projsNumber);
            this.list.appendChild(projs);
        });
    }
    displayList(){
        this.controller.active.todoList.forEach(elt=>{
            const todo = document.createElement('div');
            const titles = document.createElement('h3');
            const desc = document.createElement('p');
            const date = document.createElement('p');
            const priorities = document.createElement('p');
            titles.innerHTML= '<strong>'+ elt.title+'</strong> <br> <br>' ;
            desc.innerHTML = '<strong>'+ elt.description+'</strong> <br> <br>';
            date.innerHTML = '<strong>'+elt.DueDate+'</strong> <br> <br>';
            priorities.innerHTML = '<strong>'+elt.priority+'</strong> <br> <br>';
            todo.style.cursor = 'pointer';
            todo.style.border = '1px solid rgb(204, 204, 204)';
            todo.style.borderRadius= '10px';
            todo.style.padding = '15px';
            todo.style.margin= '10px 0';
            todo.style.borderRadius = '8px';
            todo.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3)';
            todo.style.transition = 'all 0.3s ease';
            todo.style.backgroundColor = 'rgb(250, 250, 250)';
            if(elt.priority === 'high' || elt.priority === 'High') {
                priorities.style.color = 'rgb(220, 53, 69)';
                priorities.style.fontWeight = 'bold';
            } else if(elt.priority === 'medium' || elt.priority === 'Medium') {
                priorities.style.color = 'rgb(255, 193, 7)';
            } else {
                priorities.style.color = 'rgb(40, 167, 69)';
            }
            titles.style.margin = '0 0 10px 0';
            titles.style.color = 'rgb(33, 37, 41)';
            titles.style.fontSize = '25px';
            desc.style.margin = '0 0 15px 0';
            desc.style.color = 'rgb(73, 80, 87)';
            titles.style.fontWeight = '600'
            date.style.fontStyle = 'italic';
            date.style.color = 'rgb(134, 142, 150)';
            date.style.fontSize = '15px';
            date.style.margin = '0 0 15px 0';
            todo.addEventListener('mouseenter', () => {
                todo.style.transform = 'translateY(-2px)';
                todo.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            });
            todo.addEventListener('mouseleave', () => {
                todo.style.transform = 'translateY(0)';
                todo.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
            });
            todo.appendChild(titles);
            todo.appendChild(desc);
            todo.appendChild(date);
            todo.appendChild(priorities);
            this.container.appendChild(todo);
        })
    }
    listener(){
        this.addNew.addEventListener('click', ()=>{
            const task= prompt('Enter your project name');
            if(task){
                const newTask = new project(task);
                this.controller.create(newTask);
                this.displayProjects();
            }
        });
        this.addList.addEventListener('click', ()=>{
            if(this.controller.active){
                const title = prompt('Enter the title');
                const description = prompt('Enter Description ');
                const DueDate = prompt('Enter the Due Date for the task(Please enter a valid date in G.C) ');
                const priority = prompt('Enter the level of priority you give for this project (high, medium or low) ');
                const newList = new Todo(title, description, DueDate, priority);
                this.controller.active.add(newList);
                this.displayList();
            }
        });
    }
}