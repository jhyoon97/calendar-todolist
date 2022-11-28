export interface TodoItem {
  id: number;
  description: string;
  done: boolean;
}

export interface TodoList {
  [date: string]: TodoItem[];
}
