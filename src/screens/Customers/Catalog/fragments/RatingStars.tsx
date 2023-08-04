import { FontAwesome } from "@expo/vector-icons";
import { HStack, Icon } from "native-base";
import { useMemo } from 'react';

export default function RatingStars({ rating, size = "sm", spacing = 1 }: { spacing?: number, rating: number, size?: "sm" | "lg" | "md" }) {
     const stars = useMemo(() => {
          const data = [];
          [1, 2, 3, 4, 5].forEach((item) => {
               data.push(<Icon color={"rgb(255, 149, 41)"} size={size} as={<FontAwesome name={(rating >= item) ? "star" : ((rating > (item - 1)) ? "star-half-full" : "star-o")} />} />)
          })
          return data;
     }, [rating, size])
     return <HStack alignItems="center" space={spacing}>
          {stars}
     </HStack>
}