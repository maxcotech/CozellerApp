import { Platform } from "react-native"
import { PlatformTypes } from "../config/enum.config"

export const isIos = () => {
     return (PlatformTypes.ios === Platform.OS)
}


export const getProperKeyboardAvoidingArea = () => {
     return (isIos()) ? "padding" : "height"
}