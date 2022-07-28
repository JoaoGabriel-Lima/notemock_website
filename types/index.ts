export interface Collection {
  groupname: string;
  groupicon: string;
  groupcolor: string;
  groupid: string;
  todos: Todo[];
}
export interface Todo {
  itemcontent: string;
  itemtime: string;
  checked: boolean;
  subtodo: Array<object>;
  itemid: string;
}
export type Find<T> = (args: T) => boolean;
export type Delay = (ms: number) => Promise<unknown>;
