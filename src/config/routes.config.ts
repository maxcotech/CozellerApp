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
    emailVerification: "auth/email-verification"
}

const VendorRoutes = {
    vendorIndex: "vendor",
    vendorOnboarding: "vendor/onboarding",
    createStore: "vendor/settings/create-store",
    selectStore: "vendor/settings/select-store",
    joinStore: "vendor/settings/join-store",

    vendorDashboard: "vendor/home"
}

const AccountRoutes = {
    accountList: "accounts/list",
    accountProfile: "account/profile"
}

const routes = {
    ...GeneralRoutes, ...AuthRoutes, ...VendorRoutes, ...AccountRoutes
}

export const AppParamList = Object.assign({},...Object.keys(routes).map((key) => { return {[key]:{}}})) as ParamListBase
export type AppNavProps = NativeStackNavigationProp<typeof AppParamList>;

export default routes;