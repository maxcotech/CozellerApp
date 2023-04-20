import React, { FunctionComponent } from "react";
import { AuthData } from "../config/data_types/account_types";


export interface AppContextType {
    authData?: AuthData | null,
    setAuthData: React.Dispatch<React.SetStateAction<AuthData | null>>,
}
const AppContext = React.createContext({} as AppContextType);

export const AppProvider: FunctionComponent = ({children}) => {
    const [authData,setAuthData] = React.useState<AuthData | null>({} as AuthData);
    return (
        <AppContext.Provider value={{ authData, setAuthData }} >
            {children}
        </AppContext.Provider>
    )
}

export default AppContext;