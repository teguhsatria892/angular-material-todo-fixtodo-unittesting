import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from './state/state.interface';
import {
  AddToDo,
  CompleteToDo,
  IncompleteToDo
} from './state/todo/todo.actions';
import { generateToDos, ToDo } from './state/todo/todo.model';
import Swal from "sweetAlert2"

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

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.initialize();
  }

  initialize() {
    generateToDos().forEach(todo => this.store.dispatch(new AddToDo(todo)));

    this.toDoList = generateToDos();
    this.completeToDos = this.toDoList.filter(data => data.complete == true);
    this.incompleteToDos = this.toDoList.filter(data => data.complete == false);
  }

  addToDo() {
    var id = Math.random();
    this.store.dispatch(
      new AddToDo({
        id: id,
        complete: false,
        task: this.currentToDoTaskData
      })
    );

    this.incompleteToDos.push(new ToDo(id, this.currentToDoTaskData, false));
  }

  onAddToDoChange(data: any) {
    this.currentToDoTaskData = data.task;
  }

  onCompleteToDo(toDo: ToDo) {
    this.store.dispatch(new CompleteToDo(toDo));
    this.completeToDos.push(toDo);
    this.RemoveElementInCompleteToDos(toDo.id);
  }

  onIncompleteToDo(toDo: ToDo) {
    this.store.dispatch(new IncompleteToDo(toDo));
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
