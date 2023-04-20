import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Box, HStack } from "native-base";
import { TouchableOpacity } from "react-native";
import { useState } from 'react';

export default function CustomAccordion({title,children}){
    const [expanded,setExpanded] = useState(false);
    return (
        <Box>
            <TouchableOpacity style={{paddingVertical: 2}}  onPress={() => setExpanded(!expanded)}>
                <HStack alignItems="center">
                    {title}
                    <Box ml="auto">
                        <MaterialCommunityIcons size={25} name={(expanded)? "chevron-up":"chevron-down"} />
                    </Box>
                </HStack>
            </TouchableOpacity>
            {
                (expanded)?
                <Box py={5} pl={8}>
                    {children}
                </Box>:<></>
            }
        </Box>
    )
}