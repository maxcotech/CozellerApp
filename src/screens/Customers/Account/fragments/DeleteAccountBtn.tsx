import { useQueryClient } from "react-query";
import AppBtn from "../../../../../components/AppBtn";
import { useNavigation } from "@react-navigation/native";
import routes, { AppNavProps } from "../../../../config/routes.config";
import { useDeleteAccount } from "../../../../api/queries/account.queries";
import { useState } from 'react';
import ConfirmDialog from "../../../../../components/ConfirmDialog";


export default function DeleteAccountBtn() {
     const queryClient = useQueryClient();
     const [showConfirmDelete, setShowConfirmDelete] = useState(false);
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
          <>
               <AppBtn
                    onPress={() => setShowConfirmDelete(true)}
                    isLoading={isLoading}
                    textColor="red.500"
                    backgroundColor={"rgba(255,0,0,0.1)"}
               >Delete Account</AppBtn>
               <ConfirmDialog onConfirm={() => {
                    setShowConfirmDelete(false);
                    mutate(null);

               }} message="Once you delete your account, you will lose all personal data associated to your account." title="Delete Account ??" onClose={() => setShowConfirmDelete(false)} isOpen={showConfirmDelete} />
          </>
     )

}