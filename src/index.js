import './style.css';
import {Todo} from './todo.js';
import {project} from './projects.js';
const test = new project ('Testing my projects.js code');
const check = new Todo ('test', 'testing the todo', '2025', 'high');
console.log(check);
console.log(test);