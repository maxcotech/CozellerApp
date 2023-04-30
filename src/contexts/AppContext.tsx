import React, { FunctionComponent } from "react";
import { AuthData, ProfileData } from "../config/data_types/account_types";
import { IPAddressPayload } from "../config/data_types/general.types";
import { ProductFormData } from "../config/data_types/product_types";
import { ProductFormIndexes } from "../config/enum.config";
import { createFormErrorObject } from "../helpers/message.helpers";


export interface AppContextType {
    ipPayload?: IPAddressPayload | null,
    setIpPayload?: React.Dispatch<React.SetStateAction<IPAddressPayload | null>>,
    authData?: AuthData | null,
    setAuthData: React.Dispatch<React.SetStateAction<AuthData | null>>,
    profileData?: ProfileData | null,
    setProfileData: React.Dispatch<React.SetStateAction<ProfileData | null>>,
    // productForm?: ProductFormData | null,
    // setProductForm: React.Dispatch<React.SetStateAction<ProductFormData>>,
    // productFormIndex?: ProductFormIndexes,
    // setProductFormIndex: React.Dispatch<React.SetStateAction<ProductFormIndexes>>,
    // productFormErrors?: ReturnType<typeof createFormErrorObject>,
    // setProductFormErrors: React.Dispatch<React.SetStateAction<ReturnType<typeof createFormErrorObject>>>
}
const AppContext = React.createContext({} as AppContextType);

export const AppProvider: FunctionComponent = ({children}:{children:React.ReactNode}) => {
    const [authData,setAuthData] = React.useState<AuthData | null>({} as AuthData);
    const [ipPayload,setIpPayload] = React.useState<IPAddressPayload | null>(null);
    const [profileData,setProfileData] = React.useState<ProfileData | null>(null);
    // const [productForm,setProductForm] = React.useState<ProductFormData | null>({} as ProductFormData);
    // const [productFormIndex,setProductFormIndex] = React.useState<number>(ProductFormIndexes.BasicInformation);
    // const [productFormErrors,setProductFormErrors] = React.useState<ReturnType<typeof createFormErrorObject>>(createFormErrorObject(productForm));

    return (
        <AppContext.Provider value={{ profileData, setProfileData, ipPayload, setIpPayload, authData, setAuthData }} >
            {children}
        </AppContext.Provider>
    )
}

export default AppContext;