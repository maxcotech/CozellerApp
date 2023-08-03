import { TouchableOpacity } from 'react-native';
import { OrderProductItem } from '../../../../config/data_types/order.types';
import { HStack, Image, VStack } from 'native-base';
import CText from '../../../../../components/CText';
import Money from '../../../../../components/Money';
import { Currency } from '../../../../config/data_types/currency_types';
import { useNavigation } from '@react-navigation/native';
import routes, { AppNavProps } from '../../../../config/routes.config';

export default function SubOrderProduct({ item, currency }: { item: OrderProductItem, currency: Currency }) {
     const navigation = useNavigation<AppNavProps>();
     return (
          <TouchableOpacity onPress={() => navigation.navigate(routes.customerProductDetails, { id: item.product?.id })}>
               <HStack space={1} px="10px">
                    <Image borderRadius={10} width="100px" height="100px" source={{ uri: item?.variation?.variation_image ?? item.product?.product_image }} />
                    <VStack flex={1}>
                         <CText numberOfLines={1}>{item.product?.product_name}</CText>
                         {
                              (item.variation?.variation_name) ?
                                   <CText color="gray.400" variant="body3" numberOfLines={1}>Variation: {item.variation?.variation_name ?? "Hello Chisom"}</CText> : <></>
                         }
                         <Money fontWeight={"bold"} currencySym={currency?.currency_sym}>{item.paid_amount}</Money>
                         <CText color={"gray.400"}>{item.quantity} purchased</CText>

                    </VStack>
               </HStack>
          </TouchableOpacity>
     )
}