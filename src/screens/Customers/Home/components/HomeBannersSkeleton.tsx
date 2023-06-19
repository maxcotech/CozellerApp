import { Box, Skeleton } from "native-base";


export default function HomeBannersSkeleton({ height = 100, width = "full" }: { height?: string | number, width?: string | number }) {
     return (
          <Box paddingX={5}>
               <Skeleton borderRadius={8} height={height} width={width} />
          </Box>
     )
}