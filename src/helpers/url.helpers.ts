import { Linking } from "react-native"

export const openUrl = (url: string) => {
     if (Linking.canOpenURL(url)) {
          Linking.openURL(url);
     }
}