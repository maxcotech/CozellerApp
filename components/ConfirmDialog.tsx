import { AlertDialog, HStack } from "native-base"
import { useRef, useState } from "react"
import AppBtn, { AppBtnProps } from "./AppBtn"
import { ColorType } from "native-base/lib/typescript/components/types"
import { APP_COLOR } from "../src/config/constants.config"
import { ColorValue } from "react-native"

export interface ConfirmDialogProps {
    title?: string,
    message?: string,
    isOpen: boolean,
    isLoading?: boolean,
    onClose: () => void,
    onConfirm: (iloader?: (val: boolean) => void) => void
    confirmLabel?: string,
    cancelColor?: string | ColorValue,
    confirmColor?: string | ColorValue,
    cancelLabel?: string
}

export default function ConfirmDialog({
    isLoading = false,
    confirmLabel = "Continue", cancelLabel = "Cancel",isOpen,onClose, onConfirm,confirmColor = "red", cancelColor = "silver",
    title = "Are you sure?",message = "This action, once executed may be irreversible"}:ConfirmDialogProps
){
    const alertRef = useRef();
    const [loading,setLoading] = useState(false);
    return (
        <AlertDialog leastDestructiveRef={alertRef} isOpen={isOpen} onClose={onClose}>
            <AlertDialog.Content>
                <AlertDialog.Header>{title}</AlertDialog.Header>
                <AlertDialog.Body>{message}</AlertDialog.Body>
                <AlertDialog.Footer>
                    <HStack space={2}>
                        <AppBtn onPress={onClose} textVariant="body4" backgroundColor={cancelColor}>
                            {cancelLabel}
                        </AppBtn>
                        <AppBtn isLoading={isLoading || loading} onPress={() => onConfirm(setLoading)} textVariant="body4" backgroundColor={confirmColor}>
                            {confirmLabel}
                        </AppBtn>
                    </HStack>
                </AlertDialog.Footer>
            </AlertDialog.Content>
        </AlertDialog>
    )
}