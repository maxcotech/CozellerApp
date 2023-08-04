import { useQueryClient } from "react-query";
import AppBtn from "../../../../../components/AppBtn";
import { useNavigation } from "@react-navigation/native";
import routes, { AppNavProps } from "../../../../config/routes.config";
import { useDeleteAccount } from "../../../../api/queries/account.queries";


export default function DeleteAccountBtn() {
     const queryClient = useQueryClient();
     const navigation = useNavigation<AppNavProps>();
     const { mutate, isLoading } = useDeleteAccount({
          onSuccess(data) {
               toast.show(data?.message ?? "Account Deleted Successfully");
               queryClient.clear();
               navigation.replace(routes.login);
          },
          onError(data) {
               toast.show(data?.message, { type: "danger" })
          }
     })

     return (
          <AppBtn
               onPress={() => mutate(null)}
               isLoading={isLoading}
               textColor="red.500"
               backgroundColor={"rgba(255,0,0,0.1)"}
          >Delete Account</AppBtn>
     )

}