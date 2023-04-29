import { Box, HStack, Skeleton, VStack, View } from "native-base";

export default function ProductListSkeleton(){
    return (
        <View flex={1}>
            {
                (new Array(4).fill("chisom")).map((item) => (
                    <HStack my="10px" space={2}>
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
    )
}