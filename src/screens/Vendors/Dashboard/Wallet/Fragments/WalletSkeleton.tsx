import { Box, HStack, Skeleton, VStack, View } from "native-base";

export default function WalletSkeleton(){
    return (
        <View flex={1} mt="10px">
            <Skeleton borderRadius={"md"} height="200px" />
            <View flex={1}>
            {
                (new Array(4).fill("chisom")).map((item,index) => (
                    <HStack key={index} my="10px" space={2}>
                        <Box>
                            <Skeleton height="100px" width="100px" borderRadius={"lg"} />
                        </Box>
                        <VStack flex={1} space={1}>
                            <Skeleton width="full" rounded="lg" height="15px" />
                            <Skeleton width="150px" rounded="md" height="15px" />
                            <Skeleton width="100px" rounded="md" height="15px" />
                        </VStack>
                    </HStack>
                ))
            }
        </View>
        </View>
    )
}