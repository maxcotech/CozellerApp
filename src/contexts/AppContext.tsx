import React, { FunctionComponent } from "react";
import { AuthData, ProfileData } from "../config/data_types/account_types";
import { IPAddressPayload } from "../config/data_types/general.types";


export interface AppContextType {
    ipPayload?: IPAddressPayload | null,
    setIpPayload?: React.Dispatch<React.SetStateAction<IPAddressPayload | null>>,
    authData?: AuthData | null,
    setAuthData: React.Dispatch<React.SetStateAction<AuthData | null>>,
    profileData?: ProfileData | null,
    setProfileData: React.Dispatch<React.SetStateAction<ProfileData | null>>
}
const AppContext = React.createContext({} as AppContextType);

export const AppProvider: FunctionComponent = ({children}:{children:React.ReactNode}) => {
    const [authData,setAuthData] = React.useState<AuthData | null>({} as AuthData);
    const [ipPayload,setIpPayload] = React.useState<IPAddressPayload | null>(null)
    const [profileData,setProfileData] = React.useState<ProfileData | null>(null)
    return (
        <AppContext.Provider value={{ profileData, setProfileData, ipPayload, setIpPayload, authData, setAuthData }} >
            {children}
        </AppContext.Provider>
    )
}

export default AppContext;