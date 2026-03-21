import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Todo } from '../models/crud.model';
import { CrudService } from './crud.service';

describe('CrudService', () => {
  let service: CrudService;
  let httpTesting: HttpTestingController;

  const mockTodo: Todo = {
    id: 1,
    userId: 1,
    title: 'Test todo',
    completed: false,
    body: 'Test body',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(CrudService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getTodos', () => {
    it('should fetch todos via GET', () => {
      const mockTodos: Todo[] = [mockTodo];

      service.getTodos().subscribe((todos) => {
        expect(todos).toEqual(mockTodos);
      });

      const req = httpTesting.expectOne(
        'https://jsonplaceholder.typicode.com/todos',
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockTodos);
    });
  });

  describe('updateTodo', () => {
    it('should update a todo via PUT', () => {
      service.updateTodo(mockTodo).subscribe((todo) => {
        expect(todo).toBeTruthy();
      });

      const req = httpTesting.expectOne(
        `https://jsonplaceholder.typicode.com/todos/${mockTodo.id}`,
      );
      expect(req.request.method).toBe('PUT');
      expect(req.request.headers.get('Content-type')).toBe(
        'application/json; charset=UTF-8',
      );
      req.flush(mockTodo);
    });
  });

  describe('deleteTodo', () => {
    it('should delete a todo via DELETE', () => {
      service.deleteTodo(mockTodo).subscribe();

      const req = httpTesting.expectOne(
        `https://jsonplaceholder.typicode.com/todos/${mockTodo.id}`,
      );
      expect(req.request.method).toBe('DELETE');
      req.flush({});
    });
  });
});
