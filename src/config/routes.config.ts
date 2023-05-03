import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

const GeneralRoutes = {
    introduction: "introduction",
    home: "home",
    drawer: "drawer",
    createContacts: "createContact",
    comingSoon: "comingSoon"
}

const AuthRoutes = {
    login: "auth/login",
    register: "auth/register",
    logout: "auth/logout",
    emailVerification: "auth/email-verification",
    changePassword: "auth/change-password"
}

const VendorRoutes = {
    vendorIndex: "vendor",
    vendorOnboarding: "vendor/onboarding",
    createStore: "vendor/settings/create-store",
    selectStore: "vendor/settings/select-store",
    joinStore: "vendor/settings/join-store",
    vendorDashboard: "vendor/dashboard",
    vendorCreateProduct: "vendor/dashboard/create-product",
    vendorUpdateProduct: "vendor/dashboard/update-product",
    variationForm: "vendor/dashboard/variation-form",
    categoryOptions: "vendor/category-options",
    brandOptions: "vendor/brand-options",
    vendorCreateBrand: "vendor/create-brand",
    vendorBankAccounts: "vendor/bank-accounts",
    vendorCreateBankAccount: "vendor/create-bankaccount",
    vendorUpdateBankAccount: "vendor/update-bankaccount",
    vendorRequestWithdrawal: "vendor/request-withdrawal",
    vendorOrderDetails: "vendor/order-details"
}

const VendorDashboardRoutes = {
    vendorDashboardHome: "vendor/dashboard/home",
    vendorDashboardOrders: "vendor/dashboard/orders",
    vendorDashboardProducts: "vendor/dashboard/products",
    vendorDashboardWallet: "vendor/dashboard/wallet",
    vendorDashboardSettings: "vendor/dashboard/settings"
}

const AccountRoutes = {
    accountList: "accounts/list",
    accountProfile: "account/profile"
}

const routes = {
    ...GeneralRoutes, ...AuthRoutes, ...VendorRoutes, ...VendorDashboardRoutes, ...AccountRoutes
}

export const AppParamList = Object.assign({},...Object.keys(routes).map((key) => { return {[key]:{}}})) as ParamListBase
export type AppNavProps = NativeStackNavigationProp<typeof AppParamList>;

export default routes;