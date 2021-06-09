import { Component, OnInit } from '@angular/core';
import { generateToDos, ToDo } from './state/todo/todo.model';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  completeToDos: ToDo[] = [];
  incompleteToDos: ToDo[] = [];
  currentToDoTaskData: string;
  toDoList: ToDo[] = [];

  constructor() {}

  ngOnInit(): void {
    this.initialize();
  }

  initialize() {
    this.toDoList = generateToDos();
    this.completeToDos = this.toDoList.filter(data => data.complete == true);
    this.incompleteToDos = this.toDoList.filter(data => data.complete == false);
  }

  addToDo() {
    var id = Math.random();
    this.incompleteToDos.push(new ToDo(id, this.currentToDoTaskData, false));
    return this.incompleteToDos.length;
  }

  onAddToDoChange(data: any) {
    this.currentToDoTaskData = data.task;
  }

  onCompleteToDo(toDo: ToDo) {
    this.completeToDos.push(toDo);
    this.RemoveElementInCompleteToDos(toDo.id);
  }

  onIncompleteToDo(toDo: ToDo) {
    this.incompleteToDos.push(toDo);
    this.RemoveElementCompleteToDos(toDo.id);
  }

  RemoveElementCompleteToDos(key: number) {
    this.completeToDos.forEach((value, index) => {
      if (value.id == key) this.completeToDos.splice(index, 1);
    });
  }

  RemoveElementInCompleteToDos(key: number) {
    this.incompleteToDos.forEach((value, index) => {
      if (value.id == key) this.incompleteToDos.splice(index, 1);
    });
  }
}
