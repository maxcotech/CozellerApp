

export const renderErrorText = (error: string | []) => {
    if(!!error){
        return (Array.isArray(error))? error.join("\n") : error;
    }
    return "";
}

export const createFormErrorObject = (formState: any) => {
    return Object.assign({},...Object.keys(formState).map(key => ({[key]:[]})))
}

export const errorMessage = (message: string) => {
    toast.show(message,{type:"danger"})
}

export const successMessage = (message: string) => {
    toast.show(message,{type:"success"})
}