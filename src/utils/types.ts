export interface TodoItem {
  id: string;
  description: string;
  done: boolean;
}

export interface TodoList {
  [date: string]: TodoItem[];
}
