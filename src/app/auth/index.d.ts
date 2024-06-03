export interface ILoginReq {
  username: string;
  password: string;
}

export interface ILoginRes {
  user: boolean;
  token: string;
}

export interface ILogoutRes {
  status?: string;
  detail?: string;
}
