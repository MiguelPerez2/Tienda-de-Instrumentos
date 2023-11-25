import { config } from "dotenv";

config();

export const PORT=process.env.PORT;
export const PORT_DB=process.env.PORT_DB|| 3606;
export const USER_DB=process.env.USER_DB;
export const PASSWORD_DB=process.env.PASSWORD_DB;
export const HOST_DB=process.env.HOST_DB;
export const DATABASE=process.env.DATABASE;

export const Config_Core={
  application:{
    cors:{
      server:[
        {
          origin:"localhost:3000",
          credential:true
        }
      ]
    }
  }
}