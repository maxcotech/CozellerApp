import { Box, Center, Image } from "native-base";
import { APP_COLOR_LIGHTER } from "../src/config/constants.config";
import CText from "./CText";

export interface EmptyPageProps {
    icon?: React.ReactNode,
    title?: string,
    subtitle?: string,
    children?: React.ReactNode
}
export default function EmptyPage({ icon, title = "Not Found", subtitle, children }: EmptyPageProps) {
    return (
        <Center flex={1}>
            {
                (icon) ? icon :
                    <Box borderRadius={"full"} backgroundColor={APP_COLOR_LIGHTER} p="20px" alignItems={"center"} justifyContent={"center"}>
                        <Image size="lg" alt="Empty Placeholder" source={require("../assets/empty-folder.png")} />
                    </Box>
            }

            {
                (title) ?
                    <CText mt="10px" textAlign={"center"} variant="body1" fontWeight={"bold"}>{title}</CText> : <></>

            }
            {
                (subtitle) ?
                    <CText textAlign="center" variant="body3" px="40px" color={"gray.400"}>{subtitle}</CText> : <></>
            }
            <Box mt="14px">
                {children}
            </Box>


        </Center>
    )
}