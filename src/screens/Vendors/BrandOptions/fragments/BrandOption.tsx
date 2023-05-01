import { Linking, TouchableOpacity } from 'react-native';
import { Brand } from './../../../../config/data_types/brand_types';
import { Box, HStack, VStack } from 'native-base';
import { APP_COLOR_LIGHTER } from '../../../../config/constants.config';
import { Image } from 'native-base';
import CText from '../../../../../components/CText';
import { AntDesign } from '@expo/vector-icons';

export interface BrandOptionsProps {
    data: Brand,
    onSelect: (val: Brand) => void
}


export default function BrandOption({data,onSelect}:BrandOptionsProps){
    return (
        <TouchableOpacity onPress={() => onSelect(data)}>
            <HStack space={2} py="7px" alignItems="center">
                <Box backgroundColor={APP_COLOR_LIGHTER} borderRadius="lg" alignItems={"center"} justifyContent={"center"} p="10px">
                    <Image height="50px" width="50px" source={(data.brand_logo)? {uri: data.brand_logo}: require('../../../../../assets/placeholder-image.jpg')} />
                </Box>
                <VStack flex={1}>
                    <CText numberOfLines={1}>{data.brand_name}</CText>
                    <CText variant="body3" color="gray.400">{data.website_url}</CText>
                </VStack>
                <AntDesign name="arrowright" size={20} />
            </HStack>
        </TouchableOpacity>
    )
}