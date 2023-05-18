import { createContext } from "react";

const UserContext = createContext({user : {
    name: "John Doe",
    email: "johndoe@gmail.com"
}})

export default UserContext;