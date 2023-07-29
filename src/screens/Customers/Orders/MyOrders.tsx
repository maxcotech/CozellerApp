import AppBar from "../../../../components/AppBar";
import { APP_COLOR } from "../../../config/constants.config";
import SafeScaffold from "../../../../components/SafeScaffold";

export default function MyOrders() {
     return (
          <SafeScaffold>
               <AppBar backgroundColor={APP_COLOR} textColor="white" title="My Orders" />

          </SafeScaffold>
     )
}