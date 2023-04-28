import { HStack, Skeleton } from "native-base";
import { View } from "native-base";

export default function HomeSkeleton(){
    return (
        <View mt="10px">
            <Skeleton borderRadius={"md"} height="200px" />
            <HStack space={2} mt="10px">
                <Skeleton flex={1} borderRadius={"md"}  height="150px" /> 
                <Skeleton flex={1} borderRadius={"md"} height="150px" />
            </HStack>
            <HStack space={2} mt="10px">
                <Skeleton flex={1} borderRadius={"md"}  height="150px" /> 
                <Skeleton flex={1} borderRadius={"md"} height="150px" />
            </HStack>
        </View>
    )
}