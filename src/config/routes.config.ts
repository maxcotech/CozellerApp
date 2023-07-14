import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

export const GeneralRoutes = {
    introduction: "introduction",
    home: "home",
    drawer: "drawer",
    createContacts: "createContact",
    comingSoon: "comingSoon"
}

export const AuthRoutes = {
    login: "auth/login",
    register: "auth/register",
    logout: "auth/logout",
    emailVerification: "auth/email-verification",
    changePassword: "auth/change-password",
    emailPasswordReset: "auth/email/password-reset"
}

export const VendorRoutes = {
    vendorIndex: "vendor",
    vendorOnboarding: "vendor/onboarding",
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
    vendorOrderDetails: "vendor/order-details",
}

export const vendorStoreSettingsRoute = {
    createStore: "vendor/settings/create-store",
    selectStore: "vendor/settings/select-store",
    joinStore: "vendor/settings/join-store",
    storeStaffs: "vendor/settings/store-staffs",
    staffTokens: "vendor/settings/staff-tokens",
    createStaffToken: "vendor/settings/create-staff-token",
    updateStore: "vendor/settings/update-store"
}

export const vendorShippingSettingsRoutes = {
    shippingGroups: "vendor/settings/shipping-groups",
    updateShippingGroup: "vendor/settings/update-shipping-group",
    createShippingGroup: "vendor/settings/create-shipping-group",
    shippingDimensionRange: "vendor/settings/dimension-range",
    shippingLocations: "vendor/settings/shipping-locations",
    createShippingLocations: "vendor/settings/create-shipping-locations",
    updateShippingLocations: "vendor/settings/update-shipping-locations"
}

export const VendorDashboardRoutes = {
    vendorDashboardHome: "vendor/dashboard/home",
    vendorDashboardOrders: "vendor/dashboard/orders",
    vendorDashboardProducts: "vendor/dashboard/products",
    vendorDashboardWallet: "vendor/dashboard/wallet",
    vendorDashboardSettings: "vendor/dashboard/settings"
}

export const AccountRoutes = {
    accountList: "accounts/list",
    accountProfile: "account/profile"
}

export const CustomerRoutes = {
    customerIndex: "customer/index",
    customerHome: "customer/home",
    customerCategories: "customer/categories",
    customerAccount: "customer/account",
    customerWishlist: "customer/wishlist",
    customerHelp: "customer/help",
    customerSearch: "customer/search",
    customerCatalog: "customer/catalog",
    customerProductDetails: "customer/product-details",
    customerProducts: "customer/products",
    customerShoppingCart: "customer/shopping-cart",
    customerBillingAddresses: "customer/billing-addresses",
    customerCreateAddress: "customer/create-billing-address",
    customerUpdateAddress: "customer/update-billing-address"
}

const routes = {
    ...GeneralRoutes, ...AuthRoutes, ...VendorRoutes, ...VendorDashboardRoutes, ...AccountRoutes,
    ...vendorStoreSettingsRoute, ...vendorShippingSettingsRoutes, ...CustomerRoutes
}

export const AppParamList = Object.assign({}, ...Object.keys(routes).map((key) => { return { [key]: {} } })) as ParamListBase
export type AppNavProps = NativeStackNavigationProp<typeof AppParamList>;

export default routes;