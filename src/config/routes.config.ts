import { ParamListBase } from "@react-navigation/native"

const GeneralRoutes = {
    login: "auth/login",
    home: "home",
    logout: "logout",
    drawer: "drawer",
    createContacts: "createContact"
}

const AccountRoutes = {
    accountList: "accounts/list",
    accountProfile: "account/profile"
}

const routes = {
    ...GeneralRoutes, ...AccountRoutes
}

export const AppParamList = Object.assign({},...Object.keys(routes).map((key) => { return {[key]:{}}})) as ParamListBase


export default routes;