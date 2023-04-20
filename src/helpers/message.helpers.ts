

export const renderErrorText = (error: string | []) => {
    if(!!error){
        return (Array.isArray(error))? error.join("\n") : error;
    }
    return "";
}