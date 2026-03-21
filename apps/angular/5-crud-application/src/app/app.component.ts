import { Component, inject, OnInit, signal } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { Todo } from './models/crud.model';
import { CrudService } from './services/crud.service';
import { LoadingService } from './services/loading.service';

@Component({
  imports: [MatProgressSpinner],
  selector: 'app-root',
  template: `
    @if (loadingService.loading()) {
      <div class="spinner-overlay">
        <mat-spinner />
      </div>
    }
    @for (todo of todos(); track todo.id) {
      {{ todo.id }}
      {{ todo.title }}
      <button (click)="update(todo)">Update</button>
      <button (click)="delete(todo)">Delete</button>
      <br />
    }
  `,
  styles: [
    `
      .spinner-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.3);
        z-index: 1000;
      }
    `,
  ],
})
export class AppComponent implements OnInit {
  loadingService = inject(LoadingService);
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
  delete(todo: Todo) {
    this.crudService.deleteTodo(todo).subscribe(() => {
      this.todos.update((todos) => todos.filter((t) => t.id != todo.id));
    });
  }
}
