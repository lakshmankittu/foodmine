export class User{
    id!:string;
    email!:string;
    name!:string;
    address!:string;
    token!:string;
    isAdmin!:boolean;
  }
  
export class Authresult{
  token!:string;
  result!:boolean;
  errors!:[];
  user!:User;
} 