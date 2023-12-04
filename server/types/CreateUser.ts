import { Request } from "express";

//add user type to global request object
declare global{
  namespace Express{
    interface Request {
      user: {
        id: any,
        firstName: string,
        lastName: string,
        email: string,
        verified: boolean,
        
      };
    }
  }
}

export interface CreateUser extends Request {
  body: {
    firstName: string,
    lastName: string,
    email: string;
    password: string;
  };
}