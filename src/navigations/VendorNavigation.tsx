import { ParamListBase, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationOptions, createNativeStackNavigator } from "@react-navigation/native-stack";
import routes from "../config/routes.config";
import VendorOnboarding from "../screens/Vendors/VendorOnboarding/VendorOnboarding";
import CreateStore from "../screens/Vendors/CreateStore/CreateStore";
import JoinStore from "../screens/Vendors/JoinStore/JoinStore";
import { APP_COLOR } from "../config/constants.config";
import VendorDashboard from "./VendorDashboard";
import CreateProduct from "../screens/Vendors/Dashboard/Products/CreateProduct";
import { ProductFormProvider } from "../contexts/ProductFormContext";
import CategoryOptions from "../screens/Vendors/CategoryOptions/CategoryOptions";
import BrandOptions from "../screens/Vendors/BrandOptions/BrandOptions";
import CreateBrand from "../screens/Vendors/BrandOptions/CreateBrand";
import VariationForm from "../screens/Vendors/Dashboard/Products/fragments/ProductFormFragments/VariationForm";
import UpdateProduct from "../screens/Vendors/Dashboard/Products/UpdateProduct";
import BankAccounts from "../screens/Vendors/BankAccount/BankAccounts";
import CreateBankAccount from "../screens/Vendors/BankAccount/CreateBankAccount";
import RequestWithdrawal from "../screens/Vendors/Withdrawal/RequestWithdrawal";
import UpdateBankAccount from "../screens/Vendors/BankAccount/UpdateBankAccount";
import OrderDetails from "../screens/Vendors/Dashboard/Orders/OrderDetails";
import StoreStaffs from "../screens/Vendors/StoreStaffs/StoreStaffs";
import StaffTokens from "../screens/Vendors/StoreStaffs/StaffTokens";
import CreateStaffToken from "../screens/Vendors/StoreStaffs/CreateStaffToken";
import SelectStore from "../screens/Vendors/ChangeCurrentStore/SelectStore";
import UpdateStore from "../screens/Vendors/UpdateStore/UpdateStore";
import ShippingGroups from "../screens/Vendors/ShippingGroups/ShippingGroups";
import CreateShippingGroup from "../screens/Vendors/ShippingGroups/CreateShippingGroup";
import UpdateShippingGroup from "../screens/Vendors/ShippingGroups/UpdateShippingGroup";
import DimensionRangeView from "../screens/Vendors/ShippingGroups/DimensionRangeView";

const Stack = createNativeStackNavigator();
export default function VendorNavigation(){
    const defaultOptions = { statusBarColor:APP_COLOR, headerShown: false, animation: "slide_from_right" } as NativeStackNavigationOptions | ((props: { route: RouteProp<ParamListBase, string>; navigation: any; }) => NativeStackNavigationOptions)
    return (
        <ProductFormProvider>
        <Stack.Navigator  initialRouteName={routes.vendorOnboarding}>
            <Stack.Screen
                options={defaultOptions} 
                name={routes.vendorOnboarding}
                component={VendorOnboarding}
            />
            <Stack.Screen
                options={defaultOptions}
                name={routes.createStore}
                component={CreateStore}
            />
            <Stack.Screen
                options={defaultOptions}
                name={routes.joinStore}
                component={JoinStore}
            />
            <Stack.Screen
                options={defaultOptions}
                name={routes.storeStaffs}
                component={StoreStaffs}
            />
            <Stack.Screen
                options={defaultOptions}
                name={routes.updateStore}
                component={UpdateStore}
            />
            <Stack.Screen
                options={defaultOptions}
                name={routes.staffTokens}
                component={StaffTokens}
            />
            <Stack.Screen
                options={defaultOptions}
                name={routes.createStaffToken}
                component={CreateStaffToken}
            />
            <Stack.Screen
                options={defaultOptions}
                name={routes.selectStore}
                component={SelectStore}
            />
             <Stack.Screen
                options={defaultOptions}
                name={routes.shippingGroups}
                component={ShippingGroups}
            />
            <Stack.Screen
                options={defaultOptions}
                name={routes.createShippingGroup}
                component={CreateShippingGroup}
            />
            <Stack.Screen
                options={defaultOptions}
                name={routes.shippingDimensionRange}
                component={DimensionRangeView}
            />
            <Stack.Screen
                options={defaultOptions}
                name={routes.updateShippingGroup}
                component={UpdateShippingGroup}
            />
            <Stack.Screen
                options={defaultOptions}
                name={routes.vendorDashboard}
                component={VendorDashboard}
            />
             <Stack.Screen
                options={defaultOptions}
                name={routes.vendorCreateProduct}
                component={CreateProduct}
            />
            <Stack.Screen
                initialParams={{onSelect: () => console.log("hello")}}
                options={defaultOptions}
                name={routes.categoryOptions}
                component={CategoryOptions}
            />
             <Stack.Screen
                initialParams={{onSelect: () => console.log("hello")}}
                options={defaultOptions}
                name={routes.brandOptions}
                component={BrandOptions}
            />
            <Stack.Screen
                options={defaultOptions}
                name={routes.vendorCreateBrand}
                component={CreateBrand}
            />
            <Stack.Screen
                options={defaultOptions}
                name={routes.variationForm}
                component={VariationForm}
            />
             <Stack.Screen
                options={defaultOptions}
                name={routes.vendorUpdateProduct}
                component={UpdateProduct}
            />
             <Stack.Screen
                options={defaultOptions}
                name={routes.vendorBankAccounts}
                component={BankAccounts}
            />
            <Stack.Screen
                options={defaultOptions}
                name={routes.vendorCreateBankAccount}
                component={CreateBankAccount}
            />
             <Stack.Screen
                options={defaultOptions}
                name={routes.vendorUpdateBankAccount}
                component={UpdateBankAccount}
            />
             <Stack.Screen
                options={defaultOptions}
                name={routes.vendorRequestWithdrawal}
                component={RequestWithdrawal}
            />
            <Stack.Screen
                options={defaultOptions}
                name={routes.vendorOrderDetails}
                component={OrderDetails}
            />
        </Stack.Navigator>
        </ProductFormProvider>
    )
}
