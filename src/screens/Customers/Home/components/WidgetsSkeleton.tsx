import { HStack, Skeleton, VStack } from "native-base";
import { APP_COLOR_LIGHTER, APP_COLOR_LIGHTER_2, NEW_XPADDING } from "../../../../config/constants.config";

export default function WidgetsSkeleton({ pageWidth }: { pageWidth: number }) {
     return (
          <VStack>
               <HStack alignItems="center" px={NEW_XPADDING + "px"} space={2}>
                    {
                         [1, 2, 3, 4].map((item) => (
                              <Skeleton endColor={APP_COLOR_LIGHTER_2} startColor={APP_COLOR_LIGHTER} borderRadius={8} height={"80px"} flex={1} />
                         ))
                    }

               </HStack>
               <Skeleton mx={NEW_XPADDING + "px"} mt="10px" endColor={APP_COLOR_LIGHTER_2} startColor={APP_COLOR_LIGHTER} borderRadius={8} height={"200px"} width={pageWidth - (NEW_XPADDING * 2)} />

          </VStack>
     )
}