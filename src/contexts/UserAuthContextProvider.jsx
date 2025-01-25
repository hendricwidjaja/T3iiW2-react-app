import { createContext, useContext, useState } from "react";

// This contenxt will store the JWT. By deafult, its empty.
const UserAuthContext = createContext("");

// Provider
export function UserAuthContextProvider({children}) {
    // Ideally, the value of the token comes from localStorage and gets stored there
    let [token, setToken] = useState("");

    // Then, we'd have useEffect to update the token value when it changes

    return(
        <UserAuthContext.Provider value={[token, setToken]} >
            {children}
        </UserAuthContext.Provider>
    )
}

// Create a custom Hook
export function useUserAuthContext() {
    return useContext(UserAuthContext);
}