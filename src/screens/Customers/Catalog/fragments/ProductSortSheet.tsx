import { Actionsheet } from "native-base";
import CText from "../../../../../components/CText";
import { ProductSortTypes } from "../../../../config/enum.config";
import { isIos } from "../../../../helpers/platform.helpers";
import { useEffect } from 'react';
import { ActionSheetIOS } from "react-native";

export default function ProductSortSheet({ show, onChange, onClose }: { onChange: (val: ProductSortTypes) => void, show: boolean, onClose: () => void }) {
     useEffect(() => {
          if (show && isIos()) {
               ActionSheetIOS.showActionSheetWithOptions({
                    options: ["Best Rating", "Highest Price", "Lowest Price", "Newest Price", "Oldest Price", "Cancel"],
                    message: "Sort Items by",
                    cancelButtonIndex: 5
               },
                    (btnIndex) => {
                         switch (btnIndex) {
                              case 0: return onChange(ProductSortTypes.BestRating);
                              case 1: return onChange(ProductSortTypes.HighestPrice);
                              case 2: return onChange(ProductSortTypes.LowestPrice);
                              case 3: return onChange(ProductSortTypes.NewestFirst);
                              case 4: return onChange(ProductSortTypes.OldestFirst);
                              default: return onClose();
                         }
                    }
               )
          }
     }, [show])
     if (isIos()) return <></>
     return (
          <Actionsheet isOpen={show} onClose={onClose}>
               <Actionsheet.Content>
                    <CText>Sort Items By</CText>
                    <Actionsheet.Item onPress={() => onChange(ProductSortTypes.BestRating)}>Best Rating</Actionsheet.Item>
                    <Actionsheet.Item onPress={() => onChange(ProductSortTypes.HighestPrice)}>Highest Price</Actionsheet.Item>
                    <Actionsheet.Item onPress={() => onChange(ProductSortTypes.LowestPrice)}>Lowest Price</Actionsheet.Item>
                    <Actionsheet.Item onPress={() => onChange(ProductSortTypes.NewestFirst)}>Newest First</Actionsheet.Item>
                    <Actionsheet.Item onPress={() => onChange(ProductSortTypes.OldestFirst)}>Oldest First</Actionsheet.Item>
               </Actionsheet.Content>
          </Actionsheet>
     )
}