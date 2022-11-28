import { atom } from "recoil";
import { TodoList } from "utils/types";

export const dataAtom = atom<TodoList>({
  key: "data",
  default: {},
});
