import React, { FunctionComponent } from "react";
import { CatalogFilterLimits } from "../config/data_types/catalog.types";


export interface CatalogContextType {
     filterLimits?: CatalogFilterLimits | null,
     setFilterLimits: React.Dispatch<React.SetStateAction<CatalogFilterLimits | null>>,
}
const CatalogContext = React.createContext({} as CatalogContextType);

export const CatalogProvider: FunctionComponent = ({ children }: { children: React.ReactNode }) => {
     const [filterLimits, setFilterLimits] = React.useState<CatalogFilterLimits | null>({} as CatalogFilterLimits);



     return (
          <CatalogContext.Provider value={{ filterLimits, setFilterLimits }} >
               {children}
          </CatalogContext.Provider>
     )
}

export default CatalogContext;