import { project} from "./projects.js";
import { Todo} from "./todo.js";
export class dom{
    constructor(control){
        this.controller = control;
        this.list = document.querySelector('.projects-list');
        this.container= document.querySelector('.todo-container');
        this.addList= document.querySelector('#add-button');
        this.addNew= document.querySelector('#add');
        this.dialog = document.querySelector('#dialog');
        this.fixedTodo = null;
        this.form = document.querySelector('#form');
        this.deleteButton = document.querySelector('#delete');
        this.closeButton = document.querySelector('#close');
        this.saveButton = document.querySelector('#save');
        this.titleInput = document.querySelector('#tit');
        this.descInput = document.querySelector('#desc');
        this.dateInput = document.querySelector('#date');
        this.prioritySelect = document.querySelector('#select');
        this.detailOverlay = document.querySelector('#detail');
    }
    openDialog(){
        if (!this.dialog) return;
        this.dialog.style.removeProperty('display');
        try{
            if (!this.dialog.open) this.dialog.showModal();
        }catch(_){
            this.dialog.setAttribute('open','');
        }
        if (typeof this.dialog.focus === 'function') this.dialog.focus();
    }
    closeAndResetDialog(){
        if (this.dialog && this.dialog.open) {
            try { this.dialog.close(); } catch (_) {}
        }
        if (this.detailOverlay && !this.detailOverlay.classList.contains('hidden')) {
            this.detailOverlay.classList.add('hidden');
        }
        this.resetFormState();
        if (document.activeElement && typeof document.activeElement.blur === 'function') {
            document.activeElement.blur();
        }
    }
    resetFormState(){
        if (this.form) {
            this.form.reset();
        }
        if (this.titleInput) this.titleInput.value = '';
        if (this.descInput) this.descInput.value = '';
        if (this.dateInput) this.dateInput.value = '';
        if (this.prioritySelect) this.prioritySelect.value = 'Medium';
        this.fixedTodo = null;
    }
    displayProjects(){
        this.list.innerHTML='';
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
        this.container.innerHTML='';
        if(!this.controller.active){
            return;
        }
        this.controller.active.todoList.forEach((elt)=>{
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
            todo.addEventListener('click', (e)=>{
                e.preventDefault();
                document.querySelector('#tit').value = elt.title;
                document.querySelector('#desc').value = elt.description;
                document.querySelector('#date').value = elt.DueDate;
                document.querySelector('#select').value = elt.priority;
                this.fixedTodo = elt;
                this.openDialog();
              });
            todo.appendChild(titles);
            todo.appendChild(desc);
            todo.appendChild(date);
            todo.appendChild(priorities);
            this.container.appendChild(todo);
        });
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
                this.resetFormState();
                if (this.dialog) {
                    this.openDialog();
                    if (typeof this.dialog.focus === 'function') {
                        this.dialog.focus();
                    }
                }
            }
        });
        const form = this.form;
        const deleted = this.deleteButton;
        const close = this.closeButton;
        if (this.saveButton){
            this.saveButton.addEventListener('click', (evt)=>{
                evt.preventDefault();
                if (!this.controller.active){
                    // Create a default project automatically if none selected
                    const fallbackProject = new project('My Tasks');
                    this.controller.create(fallbackProject);
                }
                const titler = this.titleInput.value; 
                const descriptions = this.descInput.value;
                const Due_Date = this.dateInput.value;
                const priority = this.prioritySelect.value;
                if (this.fixedTodo) {
                    this.fixedTodo.title = titler;
                    this.fixedTodo.description = descriptions;
                    this.fixedTodo.DueDate = Due_Date;
                    this.fixedTodo.priority = priority;
                } else {
                    const newTodo = new Todo(titler, descriptions, Due_Date, priority);
                    this.controller.active.add(newTodo);
                }
                this.displayList();
                this.closeAndResetDialog();
            });
        }
        if (form){
            form.addEventListener('submit', (e)=>{
                // Fallback: if a browser triggers form submit (e.g., Enter), close without saving
                e.preventDefault();
                const submitter = e.submitter;
                const isSave = submitter && submitter.id === 'save';
                if (!isSave){
                    this.closeAndResetDialog();
                }
            });
        }
            deleted && deleted.addEventListener('click', ()=>{
                if (this.controller.active && this.fixedTodo) {
                   this.controller.active.remove(this.fixedTodo.id);
                   this.fixedTodo= null;
                   this.displayList();
                   this.displayProjects();
                }
                this.closeAndResetDialog();
            });
            if (close) {
                close.addEventListener('click', (evt)=>{
                    evt.stopPropagation();
                    evt.preventDefault();
                    this.closeAndResetDialog();
                });
            }
        // Delegated handler inside the dialog as a fallback
        if (this.dialog){
            this.dialog.addEventListener('click', (evt) => {
                const target = evt.target;
                if (target && (target.id === 'close' || (target.closest && target.closest('#close')))) {
                    evt.stopPropagation();
                    this.closeAndResetDialog();
                }
            });
        }
        // Allow ENTER or ESC to close the dialog (ENTER closes without saving)
        if (this.dialog){
            this.dialog.addEventListener('keydown', (evt) => {
                if (evt.key === 'Enter'){
                    evt.preventDefault();
                    this.closeAndResetDialog();
                    return;
                }
                if (evt.key === 'Escape') {
                    this.closeAndResetDialog();
                }
            });
        }
        document.addEventListener('keydown', (evt) => {
            if (evt.key === 'Escape' && this.dialog && this.dialog.open) {
                this.closeAndResetDialog();
            }
        });
        this.dialog.addEventListener('close', () => {
            this.resetFormState();
        });
        this.dialog.addEventListener('cancel', () => {
            this.resetFormState();
        });
    }
}

