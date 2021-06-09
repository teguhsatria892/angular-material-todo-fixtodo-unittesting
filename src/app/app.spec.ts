import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { ToDo } from './state/todo/todo.model';

describe('TodoListComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('Beginning Data only 2 datas', () => {
    expect(component.toDoList.length).toBe(2);
  });

  it('Beginning Incomplete Datas is 1', ()=> {
    expect(component.incompleteToDos.length).toBe(1);
  });

  it('Beginning Complete Datas is 1', ()=> {
    expect(component.completeToDos.length).toBe(1);
  });

  it('Button addToDo Clicked', ()=> {
    spyOn(component, 'addToDo');

    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    expect(component.addToDo).toHaveBeenCalled();
  });

  it("onCompleteToDo add CompeteDatas and Remove one of InCompleteDatas", ()=>{
      expect(component.onCompleteToDo(new ToDo(1, "", true)));
      expect(component.incompleteToDos.length).toBe(0);
      expect(component.completeToDos.length).toBe(2);
  })

  it("onInCompleteToDo add InCompeteDatas and Remove one of CompleteDatas", ()=>{
      expect(component.onIncompleteToDo(new ToDo(2, "", true)));
      expect(component.incompleteToDos.length).toBe(2);
      expect(component.completeToDos.length).toBe(0);
  })

});
