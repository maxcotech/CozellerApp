import WebView from "react-native-webview";
import { AppRouteProp } from "../../../config/data_types/general.types";
import { useRoute } from "@react-navigation/native";
import { getQueryParamsFromUrl } from "../../../helpers/string.helpers";
import { RedirectParams } from 'flutterwave-react-native/dist/PayWithFlutterwave';
import SafeScaffold from "../../../../components/SafeScaffold";
import { FW_REDIRECT_URL } from "../../../config/constants.config";
import { useState } from 'react';
import { Box, Center, Spinner } from "native-base";

export interface FWViewProps extends AppRouteProp {
     params: {
          onComplete: (obj: RedirectParams, url?: string) => void,
          paymentUrl: string
     }
}

export default function PayWithFlutterwaveView() {
     const [loading, setLoading] = useState(true)
     const route = useRoute<FWViewProps>();
     return (
          <SafeScaffold>
               {
                    (loading) ?
                         <Center paddingY={"100px"}>
                              <Spinner size="lg" />
                         </Center> : <></>
               }

               <WebView
                    onLoad={() => setLoading(false)}
                    onNavigationStateChange={(state) => {
                         console.log(state.url)
                         if (state.url?.startsWith(FW_REDIRECT_URL)) {
                              route?.params?.onComplete(getQueryParamsFromUrl(state.url) as RedirectParams, state.url);
                         }
                    }} source={{ uri: route?.params?.paymentUrl }} style={{ flex: 1 }}
               />
          </SafeScaffold>
     )
}