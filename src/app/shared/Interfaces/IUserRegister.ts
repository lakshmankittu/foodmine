export interface IUserRegister{
    id: string|null,
    name : string;
    email : string;
    password : string;
    confirmPassword : string;
    address: string;
    isAdmin: boolean|null;
  }
  