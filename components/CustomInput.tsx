import { Input } from "native-base";
import { IInputComponentType } from "native-base/lib/typescript/components/composites/Tag/types";
import React from "react";


export interface CustomInputProps extends IInputComponentType {

}


export default function CustomInput({...props}: CustomInputProps){
    return (
        <Input {...props} fontSize="md" placeholderTextColor={"skyblue"} borderWidth={0} borderBottomWidth={2}  />

    )
}