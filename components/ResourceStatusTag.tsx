import { Box, HStack } from "native-base"
import { ResourceStatuses } from "../src/config/enum.config"
import { useMemo } from "react"
import CText from "./CText"
import { getResourceStatusColorScheme, getResourceStatusText } from "../src/helpers/status.helpers"

export interface ResourceStatusTagProps {
    children?: React.ReactNode,
    status?: ResourceStatuses
}

export default function ResourceStatusTag({children,status = ResourceStatuses.Active}:ResourceStatusTagProps){
    const statusColorScheme = useMemo(() => {
        return getResourceStatusColorScheme(status)
    },[status])
    const statusText = useMemo(() => {
        return getResourceStatusText(status)
    },[status])
    return (
        <Box rounded="sm"  px="8px" py="2px" bgColor={statusColorScheme.bgColor}  alignItems={"center"} justifyContent={"center"}>
            <CText textAlign={"center"} color={statusColorScheme.color} fontWeight="bold" variant="body4">{children ?? statusText}</CText>
        </Box>
    )
}