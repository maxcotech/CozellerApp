import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import AppBar from "../../../../components/AppBar";
import SafeScaffold from "../../../../components/SafeScaffold";
import { APP_COLOR } from "../../../config/constants.config";
import { useEffect } from 'react';
import { AppRouteProp } from "../../../config/data_types/general.types";
import { HStack, Icon, ScrollView } from "native-base";
import CartIcon from "../components/CartIcon";
import { AntDesign } from "@expo/vector-icons";
import routes, { AppNavProps } from "../../../config/routes.config";

export interface CatalogParams extends AppRouteProp {
     params?: {
          category_parameter: any
     }
}

export default function Catalog() {
     const navigation = useNavigation<AppNavProps>();
     const route = useRoute();
     useEffect(() => {
          if (route.params) {

          }
     }, [route.params])
     return (
          <SafeScaffold>
               <AppBar shadow={9} right={
                    <HStack space={5}>
                         <Icon onPress={() => navigation.navigate(routes.customerSearch)} color="white" size="lg" as={<AntDesign name="search1" />} />
                         <CartIcon size="lg" />
                    </HStack>
               } textColor="white" backgroundColor={APP_COLOR} title="All Products" />
               <ScrollView>

               </ScrollView>
          </SafeScaffold>
     )
}