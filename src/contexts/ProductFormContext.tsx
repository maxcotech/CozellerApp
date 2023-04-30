import React, { FunctionComponent } from "react";
import { ProductFormData, ProductFormKeys, SetFormValueType } from "../config/data_types/product_types";
import { ProductFormIndexes } from "../config/enum.config";
import { createFormErrorObject } from "../helpers/message.helpers";

export interface ProductFormContextType {
    productForm?: ProductFormData ,
    setProductForm: React.Dispatch<React.SetStateAction<ProductFormData>>,
    productFormIndex?: ProductFormIndexes,
    setFormValue?: SetFormValueType,
    setProductFormIndex: React.Dispatch<React.SetStateAction<ProductFormIndexes>>,
    productFormErrors?: ReturnType<typeof createFormErrorObject>,
    setProductFormErrors: React.Dispatch<React.SetStateAction<ReturnType<typeof createFormErrorObject>>>
}

const ProductFormContext = React.createContext({} as ProductFormContextType);

export const ProductFormProvider: FunctionComponent = ({children}:{children:React.ReactNode}) => {
    
    const [productForm,setProductForm] = React.useState<ProductFormData | null>({} as ProductFormData);
    const [productFormIndex,setProductFormIndex] = React.useState<number>(ProductFormIndexes.BasicInformation);
    const [productFormErrors,setProductFormErrors] = React.useState<ReturnType<typeof createFormErrorObject>>(createFormErrorObject(productForm));
    const setFormValue: SetFormValueType = (val: any, key: ProductFormKeys) => {
        setProductForm({ ...productForm, [key]: val })
    }
    return (
        <ProductFormContext.Provider value={{ setFormValue, productForm,setProductForm,productFormIndex,setProductFormIndex,productFormErrors,setProductFormErrors}} >
            {children}
        </ProductFormContext.Provider>
    )
}

export default ProductFormContext;