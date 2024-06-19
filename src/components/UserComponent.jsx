import { createContext, useState } from "react";
import { defaultUser } from "../../user";


export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(defaultUser);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}  
        </UserContext.Provider>
    );
};