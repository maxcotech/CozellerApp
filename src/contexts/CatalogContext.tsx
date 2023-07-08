import React, { FunctionComponent } from "react";
import { CatalogFilterLimits } from "../config/data_types/catalog.types";
import { CatalogFilters } from './../config/data_types/catalog.types';


export interface CatalogContextType {
     filterLimits?: CatalogFilterLimits | null,
     setFilterLimits: React.Dispatch<React.SetStateAction<CatalogFilterLimits | null>>,
     filters?: CatalogFilters | null,
     setFilters: React.Dispatch<React.SetStateAction<CatalogFilters | null>>,

}
const CatalogContext = React.createContext({} as CatalogContextType);

export const CatalogProvider: FunctionComponent = ({ children }: { children: React.ReactNode }) => {
     const [filterLimits, setFilterLimits] = React.useState<CatalogFilterLimits | null>({} as CatalogFilterLimits);
     const [filters, setFilters] = React.useState<CatalogFilters>({} as CatalogFilters);


     return (
          <CatalogContext.Provider value={{ filterLimits, setFilterLimits, filters, setFilters }} >
               {children}
          </CatalogContext.Provider>
     )
}

export default CatalogContext;