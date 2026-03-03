export interface Todo extends TodoUpdate {
  body: string;
}

export interface TodoUpdate {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
