import { Component, OnInit, signal } from '@angular/core';
import { Todo } from './models/crud.model';
import { CrudService } from './services/crud.service';

@Component({
  imports: [],
  selector: 'app-root',
  template: `
    @for (todo of todos(); track todo.id) {
      {{ todo.title }}
      <button (click)="update(todo)">Update</button>
    }
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  todos = signal<Todo[]>([]);

  constructor(private crudService: CrudService) {}

  ngOnInit(): void {
    this.crudService.getTodos().subscribe((todos) => this.todos.set(todos));
  }

  update(todo: Todo) {
    this.crudService.updateTodo(todo).subscribe((toDoUpdated) => {
      this.todos.update((todos) =>
        todos.map((t) => (t.id == todo.id ? toDoUpdated : t)),
      );
    });
  }
}
