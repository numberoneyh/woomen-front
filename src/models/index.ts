export interface Register {
  email?: string
  password?: string
  fullName?: string
  avatar?: FileList | null
}
export interface IUser {
  id?: string;
  email?: string;
  password?: string;
  fullName?: string;
  avatar?: string;
  iat?: number;
  exp?: number;
}

export interface Login {
  email?: string
  password?: string
}

export interface Err {
  status: number
  data: string
}

export interface LoginData {
  token: string | null
}

export interface Doc {
  _id?: string
  title?: string
  complete?: boolean
  author?: string
  createdAt?: Date
  updatedAt?: Date
  __v?: number
}

export interface ResponseTodos {
  map(arg0: ({ id }: { id: any; }) => { type: "Todos"; id: any; }): unknown;
  docs: Doc[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage?: any;
  nextPage: number;
}