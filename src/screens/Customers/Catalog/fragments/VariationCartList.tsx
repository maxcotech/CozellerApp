import { Actionsheet, Box, FlatList, View } from "native-base"
import { ProductVariation } from "../../../../config/data_types/product_types"
import VariationListItem from "./VariationListItem"
import CText from "../../../../../components/CText"
import AppBtn from "../../../../../components/AppBtn"
import { APP_COLOR_LIGHTER } from "../../../../config/constants.config"
import { Currency } from "../../../../config/data_types/currency_types"

export interface VariationCartListProps {
     show: boolean,
     onClose: () => void,
     currency: Currency,
     variations: ProductVariation[]
}


export default function VariationCartList({ show, onClose, variations, currency }: VariationCartListProps) {
     return (
          <>
               <Actionsheet backgroundColor={APP_COLOR_LIGHTER} isOpen={show} onClose={onClose}>

                    <Actionsheet.Content>
                         <CText>Select Variation</CText>
                         <FlatList
                              paddingX={2}
                              paddingY={2}
                              width="full"
                              data={variations}
                              keyExtractor={(item) => item.id?.toString()}
                              renderItem={({ item }) => <View paddingY={2}><VariationListItem currency={currency} item={item} /></View>}
                         />
                         <Box width="full" py={3} px={2}>
                              <AppBtn onPress={() => onClose()} backgroundColor={"red"}>Close</AppBtn>
                         </Box>
                    </Actionsheet.Content>
               </Actionsheet>
          </>
     )
}