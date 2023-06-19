import AppBar from "../../../../components/AppBar";
import SafeScaffold from "../../../../components/SafeScaffold";
import { APP_COLOR } from "../../../config/constants.config";

export default function Catalog() {
     return (
          <SafeScaffold>
               <AppBar backgroundColor={APP_COLOR} title="All Products" />
          </SafeScaffold>
     )
}