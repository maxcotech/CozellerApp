import { Box, Skeleton } from "native-base";
import { APP_COLOR_LIGHTER, APP_COLOR_LIGHTER_2 } from "../../../../config/constants.config";


export default function HomeBannersSkeleton({ height = 100, width = "full" }: { height?: string | number, width?: string | number }) {
     return (
          <Box paddingX={5}>
               <Skeleton endColor={APP_COLOR_LIGHTER_2} startColor={APP_COLOR_LIGHTER} borderRadius={8} height={height} width={width} />
          </Box>
     )
}