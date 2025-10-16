import './style.css';
import {Todo} from './todo.js';
import {project} from './projects.js';
import { controller } from './controller.js';
import {dom} from './dom.js';
import { storage } from './storage.js';
document.addEventListener('DOMContentLoaded', () => {
    const cont = new controller();
    const test = new project ('Testing my projects.js code');
    const check = new Todo ('test', 'testing the todo', '2025', 'high');
    const doms = new dom(cont);
    doms.listener();
    console.log(check);
    console.log(test);
    console.log(cont);
    console.log(doms);
}); 
