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
  itemid: string;
  subtodo: Subtodo[];
}
export interface Subtodo {
  itemcontent: string;
  checked: boolean;
  subtodoid: string;
}
export type Find<T> = (args: T) => boolean;
export type Delay = (ms: number) => Promise<unknown>;
export interface UserSession {
  name: string;
  email: string;
  image: string;
}
export type RequestBody = {
  session: {
    user: UserSession;
  };
  token: string;
};
export type CollectionID = {
  collectionid: string;
};
export type TodoID = {
  todoid: string;
};
export type SubtodoID = {
  subtodoid: string;
};
