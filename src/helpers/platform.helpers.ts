import { Platform } from "react-native"
import { PlatformTypes } from "../config/enum.config"
import { ActionSheetIOS } from "react-native"

export const isIos = () => {
     return (PlatformTypes.ios === Platform.OS)
}


export const getProperKeyboardAvoidingArea = () => {
     return (isIos()) ? "padding" : "height"
}

export const renderIosConfirmDialog = (
     { show, message, title, cancelLabel = "Cancel", confirmLabel = "Continue", onClose, onConfirm }:
          { show: boolean, message: string, title: string, cancelLabel?: string, confirmLabel?: string, onClose: () => void, onConfirm: () => void }
) => {
     if (isIos() && show) {
          ActionSheetIOS.showActionSheetWithOptions({
               options: [cancelLabel, confirmLabel],
               destructiveButtonIndex: 1,
               cancelButtonIndex: 0,
               message, title
          },
               (btnIndex) => {
                    if (btnIndex === 0) {
                         onClose();
                    }
                    if (btnIndex === 1) {
                         onConfirm();
                    }
               }
          )
     }
}